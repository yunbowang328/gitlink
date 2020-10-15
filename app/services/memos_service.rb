# encoding=utf-8
class MemosService
  include ApplicationHelper
  include ApiIndexHelper
  include ActionView::Helpers::NumberHelper
  LIMIT = 10

  def index params, current_user
    page = params[:page].to_i > 0 ? (params[:page].to_i - 1) : 0
    index_limit = params[:limit] || 5
    offset = page * index_limit.to_i
    search = params[:search].to_s.strip
    sort_name = params[:sort] || "published_at"
    
    all_memos = Memo&.visible&.roots

    all_hottest_memos = all_memos.hottest_five_memos
    hottest_memos = object_to_hash(all_hottest_memos)

    all_recommend_memos = all_memos.recommend_five_memos
    recommend_memos = object_to_hash(all_recommend_memos)

    if search.present?
      all_memos = all_memos.where("subject like ?", "%#{search}%")
    end

    memos_count = all_memos.size # 帖子的总数
    all_memos = all_memos.order_index(sort_name)&.includes(:forum_section,author: :user_extension).limit(index_limit).offset(offset)

    memo_lists = get_memo_lists(all_memos, false, current_user, false)

    {status: 0,limit: index_limit, memos_count: memos_count,
     hottest_memos: hottest_memos, recommend_memos: recommend_memos, memos: memo_lists}
  end


  def related_memos params, current_user
    memo = Memo.find(params[:id])
    return { status: 404 } if memo.hidden? && (!current_user || !(current_user.admin? || current_user.id == memo.author_id))
    all_memos = Memo.visible.roots.where("id != ?", params[:id].to_i).includes(memo_forums: :forum_section,author: :user_extension).related_search_name(memo.try(:subject).to_s).order_index("published_at").limit(5).offset(0)
    memo_lists = get_memo_lists(all_memos, false, current_user, false)
    {status: 0, memos: memo_lists}
  end

  def new params, current_user, session
    return {status: -1, message: "您的账户已被禁言，如有疑问请联系版主或论坛管理员"} if user_is_banned?(current_user)
    csrf_token =  session[:_csrf_token] ||= SecureRandom.base64(32)
    params_section = {}
    if params[:section_id].present?
      current_forum_section = ForumSection.find_by_id(params[:section_id])
      params_section = {
        id: current_forum_section.id,
        title: current_forum_section.title,
        parent_section_id: current_forum_section.ancestry,
        parent_section_title: current_forum_section&.parent&.try(:title)
      }
    end

    {status:0,:csrf_token => csrf_token, params_section: params_section}

  end

  # params 直接传params[:memo][:subject]
  #       subject标题
  #       content内容
  #       forum_id 话题类型
  #       sticky 是否置顶(创建时没入口)
  #       repertoire_name + language 技术标签
  #       attachments 附件
  #       attachment_id 是帖子的头像
  def create params, current_user
    return {status: -1, message: "请填写必填的内容"} if params[:memo][:subject].blank? || params[:memo][:content].blank? || params[:forum_id].blank? || params[:memo][:tag_id].blank? || params[:memo][:is_original].blank? 
    # elsif params[:memo][:content].length > 2000
    #   {status: -1, message: "不能超过2000个字符"}
    return {status: -1, message: "您的账户已被禁言，如有疑问请联系版主或论坛管理员"} if user_is_banned?(current_user)
    begin
      memo = Memo.new(params[:memo])
      memo.author = current_user
      memo.forum_section_id = params[:children_forum_id].present? ? params[:children_forum_id] : params[:forum_id]
    
      # memo.published_at = Time.now if params[:memo][:published_at].blank?
      memo.hidden = true
      # memo.save!
      if memo.save!
        memo.update_attachments(params[:attachments]) if params[:attachments].present?
        # 为了区分帖子头像，改变其类型为MemoIcon
        create_user_tidings(memo, "forum_post")
  
        if params[:attachment_id]
          attachment = Attachment.find(params[:attachment_id])
          attachment.update_attributes(:container_id => memo.id, :container_type => "Memo", :memo_image => true)
        end
        {status: 1, message: "帖子创建成功,请等待管理员审核", memo_id: memo.id}
      else
        {status: -1, message: memo.errors.messages.values[0][0]}
      end
    rescue => e
      {status: -1, message: e}
    end
  end

  # params
  #       :id 帖子id
  # return
  #       :memo 帖子
  #       :memo_replies 帖子的回复
  #       :recommend_shixun 推荐实训
  #       :admin 当前用户是否是管理员
  #       :author_info 表示当前帖子用户的信息
  def show params, current_user
    memo = Memo.find(params[:id])
    return { status: 404 } if memo.hidden? && (!current_user || !(current_user.admin? || current_user.id == memo.author_id))
    is_banned = user_is_banned?(current_user)
    forum_section = memo&.forum_section
  
    watcher_params = {
      visitable_type: "Memo",
      visitable_id: params[:id],
      user_id: current_user.id
    }
    #帖子的二级分类
    forum_tag = {
      title: forum_section.try(:title),
      id: forum_section.try(:id)
    }
    # 消息总数
    attachments_list = acttachements_info memo.attachments.where(:memo_image => false)
    memo_image = memo.attachments.where(:memo_image => true).first
    memo_image_info = {:id => memo_image.id, :filename => memo_image.filename, :url => "/attachments/download/" + "#{memo_image.id}" + "/" + "#{memo_image.filename}",
                       :filesize => memo_image.filesize} if memo_image

    user_praise = PraiseTread.is_user_praise(memo.id, "Memo", current_user.try(:id)).exists?
    memo.update_column(:viewed_count, memo.viewed_count + 1)
    # 帖子的回复
    memos = memo.reply_for_memo
    unless current_user.try(:admin?) # 只有管理员和发布人能看到隐藏的回复
      memos = memos.where("hidden = false or (hidden = true and author_id = ?)", current_user.try(:id))
    end
    memo_author =  memo.author
    memo_author_memos = memo_author.memos.visible.roots
    memos = memos.includes(:praise_tread, :author).order_index("created_at").limit(LIMIT)
    watched = memo_author.watched_by?(current_user)
    banned_permission = user_banned_permission current_user, memo.forum_section_id  #当前用户是否具有禁言的权限
    memo_watched = memo.watched_by?(current_user)
    # list = memo_list memos, current_user

    is_md = memo.is_md
   
    author_info = {username: memo_author.show_real_name,
                   watched: watched,
                   is_blocked: current_user&.blocked_for(memo_author.id),
                   is_blocked_by: memo_author&.blocked_for(current_user.id),
                   image_url: "/images/#{url_to_avatar(memo_author)}?#{Time.now.to_i}",
                   identity: memo_author.identity,
                   login: memo_author.login,
                   user_id: memo_author.id,
                   description: memo_author&.user_extension&.brief_introduction,
                   memos_count: memo_author_memos.posts.size,
                   replies_count: memo_author_memos.total_replies.size,
                   watchers_count: memo_author.fan_count,
                   current_login: current_user.try(:login),
                   current_image_url: current_user.try(:login).present? ? "/images/#{url_to_avatar(current_user)}?#{Time.now.to_i}" : "/images/avatars/User/b",
                   is_current_user: memo.author_id  == current_user.try(:id)
                  }
    recent_memos = memo_author_memos.posts.where("id != ?", params[:id].to_i).order_index("published_at").select([:id,:subject]).limit(3).as_json

    memo_info = {id: memo.id,
            subject: memo.subject,
            is_md: is_md,
            content: memo.content,
            time: time_from_now(memo.published_at.present? ? memo.published_at : memo.created_at),
            published_time: rename_time_minute(memo.published_at),
            hidden: memo.hidden,
            memo_watched: memo_watched,
            forum_tag: forum_tag, #类型
            sticky: memo.sticky, # 置顶 1
            is_fine: memo.is_fine, #是否加精
            viewed_count: memo.viewed_count,  #浏览
            replies_count: memo.can_see_reply_count(current_user),  #回复
            praises_count: memo.praises_count,  #赞数
            reward: memo.reward,
            attachment_url: attachments_list,
            user_praise: user_praise,
            tag_name: memo.meno_tag_name,
            is_original: memo.is_original,
            reprint_link: memo.reprint_link,
            apply_destroy: current_user&.id == memo.author_id && memo.apply_destroy?,
            
          }
    if current_user
      #TODO 通知消息暂时隐藏
      # unless memo.children.blank?
      #   memo.children.includes(:memo_messages).each do |child|
      #     child.memo_messages.each do |memo_message|
      #       memo_message.update_attributes(:viewed => true) if current_user.id == memo_message.user_id
      #     end
      #   end
      # end

      # query_memo_messages = memo.memo_messages
      # unless query_memo_messages
      #   query_memo_messages.each do |query_memo_message|
      #     query_memo_message.update_attributes(:viewed => true) if current_user.id == query_memo_message.user_id
      #   end
      # end

      if memo.author_id != current_user.id
        if memo.visit_actions.exists?(watcher_params)
          memo.visit_actions.where(watcher_params).first.update_attribute(:updated_at,Time.now)
        else
          VisitAction.create!(watcher_params)
        end
      end
    end

    {status: 0, memo: memo_info, author_info: author_info, memo_image_info: memo_image_info,
      recent_memos: recent_memos,banned_permission: banned_permission, is_banned: is_banned, is_current_admin: current_user&.admin?, current_login: current_user&.login}
  end

  def more_reply params, current_user
    page = params[:page].to_i > 0 ? (params[:page].to_i - 1) : 0
    limit = params[:limit] || 10
    offset = page * limit.to_i
    memo_id = params[:id]
    memo = Memo.find(memo_id)

    memos = memo.reply_for_memo
    unless current_user.try(:admin?) # 只有管理员和发布人能看到隐藏的回复
      memos = memos.where("hidden = false or (hidden = true and author_id = ?)", current_user.try(:id))
    end


    # 总数，分页使用
    # memos_all = Memo.where(parent_id: memo_id, hidden: false)
    memos_count =  memos.count
    memos = memos.includes(:praise_tread, :author).order_index("created_at").limit(limit).offset(offset)

    list = memo_list memos, current_user
    {:memo_replies => list, :memos_count => memos_count}
  end


  
  def confirm_delete params, current_user
    memo = Memo.find(params[:id])
    return {status: 404} unless memo.present?
    return {status: -1, message: "您没有权限操作！"} unless current_user&.id == memo.author_id

    if params[:is_apply].to_i == 1   #表示申请操作
      memo.apply_destroy!
      memo.save!
      Tiding.create!(:user_id => 1, :trigger_user_id => current_user&.id,
        container_id: memo.id, container_type: 'Memo',
        :viewed => 0, :tiding_type => "apply_delete", :extra => "d_1")
      {status: 1, message: "操作成功"}
    else
      memo.common!
      memo.save!
      
      Tiding.create!(:user_id => 1, :trigger_user_id => current_user&.id,
        container_id: memo.id, container_type: 'Memo',
        :viewed => 0, :tiding_type => "cancel_delete", :extra => "d_0")
        {status: 1, message: "已取消申请删帖"}
    end

   
  end

  def destroy params, current_user
    user_permission = check_banned_permission current_user, params[:id]
    memo = Memo.select(:id,:parent_id, :forum_section_id).find(params[:id])
    return {status: -1, message: "帖子不存在！"} unless memo.present?
    return {status: -1, message: "您没有权限操作！"} unless user_permission
    if memo.destroy
      {status: 0, message: "帖子删除成功！"}
    else
      {status: -1, message: "帖子删除失败！"}
    end
  end

  # 隐藏评论功能
  def hidden params, current_user
    memo = Memo.select([:id, :hidden]).find(params[:id])
    if current_user.admin?
      if params[:hidden] == "1"
        memo.update_attribute(:hidden, true)
      elsif params[:hidden] == "0"
        memo.update_column("hidden", false)
      end
    else
      raise("你没有权限")
    end
  end

  def edit params, current_user
    # memo_type = object_to_hash Forum.select([:id, :name])
    # memo_tag = object_to_hash Label.select([:id, :name])
    memo = Memo.select([:id, :subject, :content,:author_id,:tag_id, :is_original, :reprint_link, :forum_section_id]).find params[:id]
    return {status: -1, message: "帖子不存在"} if memo.blank?
    return {status: -1, message: "您的账户已被禁言，如有疑问请联系版主或论坛管理员"} if user_is_banned?(current_user)
    return { status: -1, message: "您没有权限编辑" } unless current_user.present? && (current_user.admin? || (current_user.id == memo.author_id) || user_banned_permission(current_user, params[:id]))

    attachments_list = acttachements_info memo.attachments.where(:memo_image => false)
    memo_image = memo.attachments.where(:memo_image => true).first
    memo_image_info = {:id => memo_image.id,
                       :filename => memo_image.filename,
                       :url => "/attachments/download/" + "#{memo_image.id}" + "/" + "#{memo_image.filename}",
                       :filesize => number_to_human_size(memo_image.filesize,significant: false, precision: 2)} if memo_image
    banned_permission = user_banned_permission current_user, params[:id]
    memo_forum_section = memo&.forum_section
    if memo_forum_section&.parent.present?
      forum_first = {
        forum_id: memo_forum_section&.parent.try(:id),
        forum_name: memo_forum_section&.parent.try(:title)
      }
      children_forum_first = {
        children_forum_id: memo_forum_section.try(:id),
        children_forum_name: memo_forum_section.try(:title)
      }
    else
      forum_first = {
        forum_id: memo_forum_section.try(:id),
        forum_name: memo_forum_section.try(:title)
      }
      children_forum_first = {}
    end
    memo.attributes.merge!({banned_permission: banned_permission,
                           attachments_url: attachments_list,
                           memo_image_info: memo_image_info,
                           forum_section: forum_first,
                           children_forum_section: children_forum_first
                          })
  end

  def memo_hidden params, current_user
    memo = Memo.find params[:id]
    if params[:checked].to_s == 'true'
      publish_time = Time.now
      action_type = "passed"
      extra = "1"
    else
      publish_time = Time.now
      action_type = "refuse"
      extra = "2"
    end
    memo.update_attributes(hidden: !(params[:checked].to_s == 'true'), published_at: publish_time) # 勾选代表不隐藏，所以要取反
    CheckedAction.create!(user_id: current_user.id,checkable_type: "Memo",checkable_id: params[:id], action_type: action_type, action_at: Time.now)


    if !memo.hidden? && memo.parent_id.present? && !memo.tidings.exists?(user_id: memo.parent.author_id,trigger_user_id: memo.author_id, extra: "3")
      Tiding.create(:user_id => memo.parent.author_id, :trigger_user_id => memo.author_id,
                    container_id: memo.id, container_type: 'Memo',
                    :parent_container_id => memo.root_id, :parent_container_type => "Memo",
                    :viewed => 0, :tiding_type => "Comment", :extra => "3")

    elsif !memo.hidden?  && memo.parent_id.blank?
      Tiding.create(:user_id => memo.author_id, :trigger_user_id => current_user.id,
                    container_id: memo.id, container_type: 'Memo',
                    :viewed => 0, :tiding_type => "Comment",:extra => extra)

    end
    {status: 1, message: "设置成功", is_hidden: memo.hidden}
  end

  def update params, current_user
    if params[:memo][:subject].blank? || params[:memo][:content].blank? || params[:forum_id].blank? || params[:children_forum_id].blank?
      {status: -1, message: "帖子内容不能为空"}
    elsif user_is_banned?(current_user)
      {status: -1, message: "您的账户已被禁言，如有疑问请联系版主或论坛管理员"}
    else
      memo = Memo.find params[:id]
      return { status: 404 } if memo.hidden? && (!current_user || !(current_user.admin? || current_user.id == memo.author_id))
      memo.update_attributes(params[:memo])
      memo.update_attachments(params[:attachments]) if params[:attachments].present?
      memo.forum_section_id = params[:children_forum_id].present? ? params[:children_forum_id] : params[:forum_id]
      if memo.save!
        if params[:attachment_id]
          attachment = Attachment.find(params[:attachment_id])
          attachment.update_attributes(:container_id => memo.id, :container_type => "Memo", :memo_image => true)
        end
  
        {status: 1, message: "帖子更新成功！"}
      else
        {status: -1, message: memo.errors.messages.values[0][0]}
      end
    end
  end


  # params
  #       parent_id: 给谁的回复（id）
  #       content: 回复的内容
  def reply params, current_user
    memo = Memo.find params[:parent_id]
    return {status: -1, message: "您的账户已被禁言，如有疑问请联系版主或论坛管理员"} if user_is_banned?(current_user)
    return {status: -1, message: "根据对方设置，暂时不能评论"} if memo.author.blocked_for(current_user&.id)
    return { status: 404 } if memo.hidden? && (!current_user || !(current_user.admin? || current_user.id == memo.author_id))
    begin
      memo_params = {
        parent_id: params[:parent_id] || nil,
        content: params[:content].to_s,
        subject: memo.subject,
        author_id: current_user.id,
        root_id: memo.root_id || memo.id,
        hidden: true
      }
      
      reply = Memo.new(memo_params)

      if reply.save
        memo.update_attribute(:last_reply_on, Time.now)
        memo.children << reply
        create_user_tidings(reply, "forum_comment")
        replies = {:id => reply.id, :content => reply.content, :time => time_from_now(reply.created_at), :user_id => reply.author_id,
          :image_url => "/images/#{url_to_avatar(reply.author)}?#{Time.now.to_i}", :username => reply.author.show_real_name, :reward => memo.reward, :hidden => reply.hidden,
                   :praise_count => reply.praises_count,:user_login => reply.author.try(:login), replies_count: reply.can_see_reply_count(current_user)}
        {
          status: 0,
          reply: replies
        }
      else
        {status: -1, message: reply.errors.messages.values[0][0]}
      end
    rescue => e
      {status: -1, message: "出现错误"}
      raise ActiveRecord::Rollback
    end
  end

  def watch_memo params, current_user
    memo = Memo.find params[:id]
    if params[:is_watch] == 1
      if Watcher.exists?(watchable_type: "Memo", watchable_id: params[:id], user_id: current_user.id)
        w_status = -1
        w_msg = "您已收藏"
      else
        memo_watch = Watcher.new(watchable: memo, user_id: current_user.id)
        if memo_watch.save
          w_status = 0
          w_msg = "收藏成功"
        else
          w_status = -1
          w_msg = "收藏失败，请稍后重试"
        end
      end
    else
      if Watcher.exists?(watchable_type: "Memo", watchable_id: params[:id], user_id: current_user.id)
        Watcher.where(watchable_type: "Memo", watchable_id: params[:id], user_id: current_user.id).destroy_all
        w_status = 0
        w_msg = "取消收藏成功"
      else
        w_status = -1
        w_msg = "您还未添加收藏"
      end
    end
    {status: w_status, message: w_msg}
  end

  # params:
  #        order：   排序
  #        sticky:   1 置顶,0 取消置顶
  #        id：      帖子ID
  def set_top_or_down params, current_user
    user_permission = check_banned_permission current_user, params[:id]
    s_order = params[:order] || "updated_at"
    if user_permission
      if Memo.find(params[:id]).update_attribute(:sticky, params[:sticky])
        set_status = 0
        set_msg = "操作成功"
      else
        set_status = -1
        set_msg = "操作失败"
      end

    else
      set_status = -1
      set_msg = "您没有权限"
    end

    # memos = Memo.field_for_list.includes(:praise_tread, :author, :forums).where(:root_id => nil).order("sticky=1 desc, #{s_order} desc").limit(15)
    # memo_list = memo_data memos
    {status: set_status, message: set_msg}

  end

  def plus params, current_user
    plus_type = params[:container_type].to_s
    plus_id = params[:id]

    pt = PraiseTread.where(:praise_tread_object_id => params[:id], :praise_tread_object_type => params[:container_type],
                           :user_id => current_user, :praise_or_tread => 1).first
    # 如果当前用户已赞过，则不能重复赞
    if params[:type] == 1 && pt.blank?
      if pt.blank?
        PraiseTread.create!(:praise_tread_object_id => plus_id, :praise_tread_object_type => plus_type,
                            :user_id => current_user.id, :praise_or_tread => 1)  if pt.blank?

        plus_name = plus_type.constantize.find(params[:id])
        Tiding.create(:user_id => plus_name.try(:author_id), :trigger_user_id => current_user.id,
                      container_id: plus_id, container_type: plus_type,
                      :parent_container_id => plus_id, :parent_container_type => plus_type,
                      :viewed => 0, :tiding_type => "PraiseTread")
      end
    else
      pt.destroy if pt.present? # 如果已赞过，则删掉这条赞（取消）；如果没赞过，则为非法请求不处理
    end
    {:praise_count => PraiseTread.where(:praise_tread_object_id => params[:id], :praise_tread_object_type => params[:container_type],
                                               :praise_or_tread => 1).count} 
  end

  def banned_user params, current_user
    user_permission = check_banned_permission current_user, params[:id]
    if user_permission
      last_banned_forum =  BannedForum.where(user_id: params[:user_id])&.last
      user_banned_count = last_banned_forum&.banned_count.to_i

      if params[:banned].to_i == 1  #表示禁言
        banned_params = {
          user_id: params[:user_id],
          author_id: current_user.id,
          memo_id: params[:id],
          is_banned: true,
          banned_count: user_banned_count + 1
        }
        BannedForum.create!(banned_params)
        {status: 0, message: "禁言成功"}
      else
        BannedForum.where(user_id: params[:user_id]).update_all(is_banned: false)
        {status: 0, message: "取消禁言成功"}
      end

    else
      {status: -1, message: "您没有权限操作"}
    end
  end

  def is_fine params, current_user
    user_permission = check_banned_permission current_user, params[:id]
    if user_permission
      if params[:is_fine] == 1
        is_fine_b = true
      else
        is_fine_b = false
      end
      memo = Memo.find(params[:id]).update_attribute(:is_fine, is_fine_b)
      if memo
        {status: 0, message: "操作成功"}
      else
        {status: -1, message: "操作失败"}
      end
    else
      {status: -1, message: "您没有权限操作"}
    end
  end

  def forum_memos_head  params, current_user
    forum_section = ForumSection.find_by_id(params[:id])
    return {status: -1, message: "版块不存在"} if forum_section.blank?
    section_author = forum_section.user
    forum_section_user = {username: section_author.try(:show_real_name), user_login: section_author.try(:login)}
    forum_moders = []
    if ForumModerator.exists?(forum_section_id: forum_section.id)
      all_forum_moderators = forum_section.forum_moderators.includes(user: :user_extension).select([:id, :user_id])
      all_forum_moderators.each do |moder|
        moder_user = moder.user
        forum_moder = {
          username: moder_user.show_real_name,
          user_login: moder_user.try(:login)
        }
        forum_moders << forum_moder
      end
    end
    today_memos = forum_section.group_today
    publish_today_count = today_memos.roots.size
    replies_today_count = today_memos.size - publish_today_count
    bread_crumb = get_bread_crumb(forum_section, current_user)
    banned_permission = user_banned_permission current_user, params[:id]
    watched = forum_section.watched_by?(current_user)
    {
      watched: watched, 
      bread_crumb: bread_crumb, 
      publish_today_count: publish_today_count,
      replies_today_count: replies_today_count,
      forum_section: single_section_info(forum_section),
      forum_section_user: forum_section_user,
      forum_moders: forum_moders,
      banned_permission: banned_permission
    }
  end

  def forum_memos params, current_user
    forum_section = ForumSection.find_by_id(params[:id])
    sort_name = params[:sort] || "published_at"
    return {status: -1, message: "版块不存在"} if forum_section.blank?

    page = params[:page].to_i > 0 ? (params[:page].to_i - 1) : 0
    offset = page * LIMIT
    all_memos = forum_section.memos.posts
    select_type = params[:select_type]
    case select_type.to_s
    when "is_fine"
      all_memos = all_memos.visible.where(is_fine: true)
    when "my_memos"
      all_memos = all_memos.where(author_id: current_user.id)
    when "my_topics"
      my_reply_memos = current_user.memos.visible.select([:id, :author_id, :hidden,:parent_id]).where("parent_id is not Null").pluck(:parent_id).uniq
      all_memos = all_memos.where(id: my_reply_memos)
    else
      all_memos = all_memos.visible
    end

    if params[:search].present?
      all_memos = all_memos.where("subject like '%#{params[:search].to_s.strip}%'")
    end

    # 总数，分页使用
    all_memos = all_memos.order_index(sort_name)
    memos_count =  all_memos.size
    all_memos = all_memos.limit(LIMIT).includes(:author, :praise_tread).offset(offset)

    memo_lists = []
    if all_memos.size > 0
      memo_lists = get_memo_lists(all_memos, true, current_user, false)
    end
    { 
      memos_count: memos_count,
      limit: LIMIT,
      memos: memo_lists,
    }
  end

  def forum_memos_right params, current_user
    forum_section = ForumSection.find_by_id(params[:id])
    notice = forum_section.section_notice
    all_memos = forum_section.memos.posts.select(:author_id)
    active_user_ids = all_memos.group("author_id").size.keys.uniq.first(6)
    children_sections = ForumSection.where("ancestry is not null").order("watchers_count desc, memos_count desc").select([]).first(4)
    new_childre_section = list_hot_sections(children_sections)
    active_users = User.where(id: active_user_ids)
    active_user_array = []
    active_users.each do |user|
      active_user_array.push({
        username: user.show_real_name, 
        login: user.login,
         image_url: "#{url_to_avatar(user)}?#{Time.now.to_i}"
      })
    end
    {
      username: forum_section.user.show_real_name,
      user_login: forum_section.user.login,
      notice: notice.try(:content),
      recommend_forum_sections: new_childre_section,
      active_users: active_user_array
    }

  end

  def is_watch params, current_user
    forum_section = ForumSection.find(params[:id])
    children_sections = nil
    children_sections = forum_section.descendants
    if params[:is_watch] == 1
      if Watcher.exists?(watchable_type: "ForumSection", watchable_id: params[:id], user_id: current_user.id)
        w_status = -1
        w_msg = "您已收藏"
      else
        Watcher.create(watchable: forum_section, user_id: current_user.id)
        forum_section.increment!(:watchers_count)
        if children_sections.present?
          children_sections.each do |section|
            Watcher.create!(watchable: section, user_id: current_user.id)
            section.increment!(:watchers_count)
          end
        end
        w_status = 0
        w_msg = "收藏成功"
      end
    else
      sections_ids = []
      sections_ids = children_sections.pluck(:id) if children_sections.present?
      forum_all_sections = [params[:id]] + sections_ids
      forum_section.decrement!(:watchers_count)
      if Watcher.exists?(watchable_type: "ForumSection", watchable_id: params[:id], user_id: current_user.id)
        Watcher.where(watchable_type: "ForumSection", watchable_id: forum_all_sections, user_id: current_user.id).destroy_all
        w_status = 0
        w_msg = "取消收藏成功"
      else
        w_status = -1
        w_msg = "您还未收藏"
      end
    end
    {status: w_status, message: w_msg}

  end

  protected

  def find_memo params
    if params[:id].blank?
      @memo = Memo.new
    else
      @memo = Memo.find params[:id]
    end
  end
  

  # 将memos对象添加额外信息
  def memo_data memos
    memo_list = []
    memos.each do |m|
      forum_name = m.forums.map(&:name)
      user_info = {username: m.author.show_real_name, login: m.author.login, image_url: "#{url_to_avatar(m.author)}?#{Time.now.to_i}", forum_name:forum_name, praise_count: m.praises_count}
      memo_list << m.attributes.dup.merge(user_info)
    end
    memo_list
  end

  # 权限
  def permission memo, current_user
    if current_user.admin?
      1
    elsif memo.author_id == current_user.id
      2
    else
      3
    end
  end

  
  def check_banned_permission current_user, memo_id
    forum_id = MemoForum&.where(is_children: false, memo_id: memo_id)&.first.try(:forum_id).to_s
    user_banned_permission current_user, forum_id
  end

  def tag_list reps
    rep_list = []
    reps.each do |r|
      sub_ids = SubRepertoire.where(:repertoire_id => r.id).pluck(:id)
      tag = object_to_hash TagRepertoire.where(:sub_repertoire_id => sub_ids).field_for_list.order("name asc")
      rep_list << {:rep => r, :tag => tag}
    end
    return rep_list
  end

  def memo_list memos, current_user

    return nil if memos.blank?
    # parent_reply_ids = memos.where()
    list = [] # 贴子的回复
    memos.includes(:praise_tread).each do |memo|
      is_banned = user_is_banned?(memo.author)  #帖子的用户是否被禁言

      # 用户是否点赞
      user_praise = memo.praise_tread.exists?(user_id: current_user.try(:id).to_i)
      permission = current_user ? current_user.manager_of_memo?(memo) : false
      # 实训（TPM）的管理员可以看到隐藏的评论
      replies = {:id => memo.id, :content => memo.content, :time => time_from_now(memo.created_at), :user_id => memo.author_id,
                 :image_url => "/images/#{url_to_avatar(memo.author)}?#{Time.now.to_i}", :username => memo.author.show_real_name, :reward => memo.reward, :hidden => memo.hidden,
                 :permission => permission, :praise_count => memo.praises_count, :user_praise => user_praise,
                 :user_login => memo.author.try(:login), :admin => current_user&.admin, is_banned: is_banned, replies_count: memo.can_see_reply_count(current_user)}
      childrens =  Memo.where(:parent_id => memo.id).includes(:author).reorder("created_at desc").limit(5)
      unless current_user.try(:admin?) # 只有管理员和发布人能看到隐藏的回复
        childrens = childrens.where("hidden = false or (hidden = true and author_id = ?)", current_user.try(:id))
      end
      children_list = [] # 子回复
      childrens.each do |child|
        children_praise = child.praise_tread.exists?(user_id: current_user.try(:id).to_i)
        children_is_banned = user_is_banned?(child.author)  #帖子的用户是否被禁言
        children_list << {:id => child.id, :content => child.content, :time => time_from_now(child.created_at),:praise_count => memo.praises_count, :user_praise => children_praise,
                          :image_url => "/images/#{url_to_avatar(child.author)}?#{Time.now.to_i}", :username => child.author.show_real_name, :hidden => child.hidden, replies_count: child.can_see_reply_count(current_user),
                          :permission => permission, :user_login => child.author.try(:login), :user_id => child.author.try(:id), :parent_id => child.parent_id, is_banned: children_is_banned}
      end
      list << replies.merge({children: children_list})
    end
    list
  end

  # 帖子附件信息
  def acttachements_info attachments
    attachments_list = []
    if attachments.present?
      attachments.each do |attach|
        attachments_list << {:id => attach.id,
                             :title => attach.filename,
                             :url => "/attachments/download/" + "#{attach.id}" + "/" + "#{attach.filename}",
                             :filesize => number_to_human_size(attach.filesize,significant: false, precision: 2)}
      end
    end
    return attachments_list
  end

  # 判断编辑器存储的内容是否是html类型的（ke），目的为了区分ke和markdown
  def editor_html update_time
    # str.include?("<p>" || "<div>" || "<span>" || "<img>" || "<strong>") && update_time < "2018-06-23"
    update_time < "2018-06-23"
  end

  def list_hot_sections(forum_sections)
    new_sections = []
    forum_sections.each do |sec|
      single_info = single_section_info(sec)
      new_sections.push(single_info)
    end
    return new_sections
  end

  def single_section_info(section)
    image = section.image_attachment
    return {
      id: section.id,
      title: section.title,
      description: section.description,
      memos_count: section.visible_memos_count,
      watchers_count: section.watchers_count,
      picture: image.present? ? "/attachments/download/" + "#{image.id}" + "/" + "#{image.filename}" : ""
    }
  end
end
