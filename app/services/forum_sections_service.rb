# encoding=utf-8

class ForumSectionsService
  include ApplicationHelper
  include ApiIndexHelper
  LIMIT = 10

  def index params
    index_sections = all_sections(params[:is_detail] || nil)
    {status: 0, forum_sections: index_sections}
  end

  def select_sections 
    forum_root_tags = ForumSection.roots.select([:id, :title, :ancestry])
    get_all_sections(forum_root_tags)
  end

  def create params, current_user
    set_forum_section(params[:id])
    return {status: -1, message: "请登录"} unless check_user_permission(current_user, params[:id])

    if params[:title].strip.length > 20
      {status: -1, message: "不能超过最大限制：20个字符"}
    elsif  ForumSection.exists?(title: params[:title].strip)
      {status: -1, message: "不能重名"}
    else
      forum_section_params = {
        user_id: current_user.id,
        title: params[:title].strip,
        parent_id: params[:id],
        is_recommend: false
      }
      forum_section = ForumSection.new(forum_section_params)
      if forum_section.save
        {status: 0, message: "创建成功", title: params[:title], childre_section_id: forum_section.id }
      else
        {status: -1, message: "保存失败"}
      end
    end
  end

  def rename params, current_user
    set_forum_section(params[:id])
    return {status: -1, message: "请登录"} unless check_user_permission(current_user, params[:id])

    if params[:title].strip.length > 20
      {status: -1, message: "不能超过最大限制：20个字符"}
    elsif  ForumSection.exists?(title: params[:title].strip)
      {status: -1, message: "不能重名"}
    else
      forum_section = ForumSection.find(params[:children_section_id])
      if forum_section.update_attribute(:title, params[:title].strip)
        {status: 0, message: "重命名成功", title: params[:title].strip, childre_section_id: params[:children_section_id] }
      else
        {status: -1, message: "重命名失败"}
      end
    end
  end

  def destroy params, current_user
    set_forum_section(params[:id])
    return {status: -1, message: "请登录"} unless check_user_permission(current_user, params[:id])
    forum_section = ForumSection.find(params[:children_section_id])
    if forum_section.destroy
      {status: 0, message: "删除成功"}
    else
      {status: -1, message: "删除失败"}
    end
  end

  def order_forums params, current_user
    set_forum_section(params[:id])
    return {status: -1, message: "请登录"} unless check_user_permission(current_user, params[:id])

    children_forums = @forum_section.children_forum.order("created_at #{params[:order_type]}")
    children_forums_sections = get_children_sections(children_forums)
    forum_tag = {
      title: @forum_section.try(:title),
      id: @forum_section.try(:id),
      children_tags: children_forums_sections
    }
    {status:0, forum_tag: forum_tag }
  end

  def search_users params, current_user
    set_forum_section(params[:id])
    return {status: -1, message: "请登录"} unless check_user_permission(current_user, params[:id])

    search_users = []
    user_name = params[:user_name].to_s.strip
    page = params[:page].to_i > 0 ? (params[:page].to_i - 1) : 0
    offset = page * LIMIT
    if user_name.blank?
      users_count = 0
    else
      users = User.where("( LOWER(login) LIKE ? or LOWER(concat(lastname, firstname)) LIKE ? or LOWER(mail) LIKE ? )",
                       "%#{user_name}%","%#{user_name}%","%#{user_name}%")
      users_count =  users.size
      users = users.order("created_on desc").limit(LIMIT).offset(offset)
      users.each do |u|
        user_item = {
          id: u.id,
          login: u.try(:login),
          username: u.try(:show_real_name),
          nickname: u.try(:nickname)
        }
        search_users.push(user_item)
      end
    end
    
    {status:0, user_lists: search_users, users_count: users_count, limit: LIMIT}

  end

  def add_users params, current_user
    set_forum_section(params[:id])
    return {status: -1, message: "请登录"} unless check_user_permission(current_user, params[:id])
    user_ids = params[:user_ids].reject(&:blank?)
    children_forum_id = params[:children_section_id]

    if user_ids.present?
      forum_users = []
      user_ids.each do |id|
        unless ForumModerator.exists?(user_id: id, forum_section_id:children_forum_id)
          moder_lists = {
            user_id: id,
            forum_section_id: children_forum_id,
            is_children: true
          }
          new_forum_moder = ForumModerator.new(moder_lists)
          if new_forum_moder.save
            user = new_forum_moder.user
            user_list = {
              forum_moderator_id: new_forum_moder.id,
              login: user.try(:login),
              username: user.try(:show_real_name),
              user_url: "/users/#{user.try(:login)}"
            }
            forum_users.push(user_list)
          end
        end
      end

      {status:0, message: "用户添加成功", user_lists: forum_users}
    else
      {status:-1, message: "请添加管理员"}
    end


  end

  #一级版主的管理模块
  def managements params, current_user
    set_forum_section(params[:id])
    return {status: -1, message: "请登录"} unless check_user_permission(current_user, params[:id])
    bread_crumb = get_bread_crumb(@forum_section, current_user)

    #当为一级分类时
    # current_user_info = format_for_current_user current_user
    if @forum_section.root?
      children_forum_sections = @forum_section.children.select([:id,:title, :ancestry])
      children_forum_users = get_children_sections(children_forum_sections)
      forum_tag = {
        title: @forum_section.try(:title),
        id: @forum_section.try(:id),
        children_tags: children_forum_users
      }
    else  #当为二级分类时
      forum_tag = {
        title: @forum_section.try(:title),
        id: @forum_section.try(:id)
      }
    end

    # if @forum_section.parent_id.present?
    #   forum_tag = {
    #     title: @forum_section.try(:title),
    #     id: @forum_section.try(:id),
    #   }
    # else  #当为一级分类时
    #   children_forum_sections = ForumSection.where(parent_id: @forum_section.id).select([:id,:title])
    #   children_forum_users = get_children_sections(children_forum_sections)

    #   forum_tag = {
    #     title: @forum_section.try(:title),
    #     id: @forum_section.try(:id),
    #     children_tags: children_forum_users
    #   }
    # end

    user_management_sections = []
    #当前用户具有的管理权限的版块
    current_user_forum_ids = current_user.forum_moderators.pluck(:forum_section_id)
    current_user_parent_forums = ForumSection.roots.where(id: current_user_forum_ids).select([:id,:title, :ancestry])
    current_user_parent_forums.each do |section|
      manage_children_forum_sections = section.children.select([:id,:title])
      section_forum_tag = {
        title: section.try(:title),
        id: section.try(:id),
        children_tags: object_to_hash(manage_children_forum_sections)
      }
      user_management_sections.push(section_forum_tag)
    end

    {status: 0, bread_crumb: bread_crumb, forum_tag: forum_tag, user_manage_sections: user_management_sections}

  end

  #处理申请的页面
  def applied_forums params, current_user
    set_forum_section(params[:id])
    return {status: -1, message: "请登录"} unless check_user_permission(current_user, params[:id])
    if @forum_section.parent_id.present?
      applied_forum_moderators = {}
    else
      applied_forum_moderators = []
      all_applied_forums = @forum_section.apply_forums.where(is_confirm: 0)  #待审批的版主申请
      if all_applied_forums.size > 0
        all_applied_forums.each do |apply|
          user = apply.user
          forum_section = apply.forum_section
          parent_forum_section_array = {}
          if forum_section.parent_id.present?
            parent_forum_section = forum_section.parent_forum
            parent_forum_section_array = {
              forum_title: parent_forum_section.try(:title),
              forum_id: parent_forum_section.try(:id),
              forum_url: "/memos/forum_memos/#{parent_forum_section.try(:id)}",
            }
          end
          apply_user = {
            apply_id: apply.id,
            username: user.try(:show_real_name),
            login: user.try(:login),
            image_url: "#{url_to_avatar(user)}?#{Time.now.to_i}",
            user_url: "/users/#{user.try(:login)}",
            user_ip: apply.user_ip,
            user_ip_address: get_user_ip(apply.user_ip),
            time: time_from_now(apply.created_at),
            forum_title: forum_section.try(:title),
            forum_id: forum_section.try(:id),
            forum_url: "/memos/forum_memos/#{forum_section.try(:id)}",
            parent_forum: parent_forum_section_array
          }
          applied_forum_moderators.push(apply_user)
        end
      end
    end

    {status: 0, applied_moderators: applied_forum_moderators}
  end

  #处理版主的申请
  def deal_applies params, current_user
    set_forum_section(params[:id])
    return {status: -1, message: "请登录"} unless check_user_permission(current_user, params[:id])
    apply_forum = ApplyForum.find(params[:apply_id])
    if apply_forum.present?
      apply_forum.update_attributes(is_confirm: params[:deal_type].to_i, confirm_user_id: current_user.id, deal_time: Time.now)
      forum_moder = ForumModerator.where(user_id: apply_forum.user_id,forum_section_id: params[:id])
      if params[:deal_type].to_i == 2
        forum_moder.delete_all if forum_moder.exists?
      elsif params[:deal_type].to_i == 1
        unless forum_moder.exists?
          ForumModerator.create(user_id: apply_forum.user_id, forum_section_id: params[:id],is_children: @forum_section.try(:parent_id).present?)
        end
      end

      review_params = {
        review_status: params[:deal_type].to_i,
        reason: nil,
        user_id: current_user.id,
        reviewable_type: "ApplyForum",
        reviewable_id: params[:apply_id],
        source: "apply_forum"
      }
      if Review.exists?(reviewable_type: "ApplyForum", reviewable_id: params[:apply_id], source: "apply_forum")
        this_review = Review.where(reviewable_type: "ApplyForum", reviewable_id: params[:apply_id], source: "apply_forum").first
        this_review.update_attributes(review_params)
      else
        Review.create(review_params)
      end
      status = 1
      msg = "操作成功"
    else
      status = -1
      msg = "操作失败"
    end
    {status: status, message: msg}
  end

  def destroy_moderator params, current_user
    set_forum_section(params[:id])
    return {status: -1, message: "请登录"} unless check_user_permission(current_user, params[:id])
    forum_manager = ForumModerator.find(params[:moderator_id])
    if forum_manager.present?
      if forum_manager.destroy
        status = 1
        msg = "删除成功"
      else
        status = -1
        msg = "删除失败"
      end
    else

      status = -1
      msg = "用户不存在"
    end
    {status: status, message: msg}
  end


  def user_apply params, current_user, user_ip
    set_forum_section(params[:id])
    if @forum_section.forum_moderators.exists?(user_id: current_user.id)
      status = -1
      msg = "您已经是该版块的版主"
    elsif ApplyForum.exists?(user_id: current_user.id, is_confirm: [0,1])
      status = -1
      msg = "您已提交了版主申请"
    else
      apply_params = {
        user_id: current_user.id,
        user_ip: user_ip,
        forum_section_id: params[:id],
        is_confirm: 0
      }
      apply_forum = ApplyForum.new(apply_params)
      if apply_forum.save
        status = 0
        msg = "申请成功"
        if @forum_section.parent_id.present?
          parent_section_id = @forum_section.parent_id
          manager_ids = ForumModerator.where(forum_section_id: @forum_section.parent_id).pluck(:user_id)
          extra = "2"
        else
          parent_section_id = ""
          manager_ids = User.select(:admin, :id).admin_users.pluck(:id)
          # admin_role_ids= AdminRole.includes(:admin_permissions).joins(:admin_permissions).where("admin_permissions.name = 'forum_post'").pluck(:id)
          # manager_ids = UserAdminRole.where(admin_role_id: admin_role_ids).pluck(:user_id).uniq
          extra = "1"
        end
        if manager_ids.size == 0
          manager_ids = [1]
        end
        manager_ids.each do |id|
          Tiding.create(:user_id => id, :trigger_user_id => current_user.id,
                        container_id: params[:id], container_type: 'ForumSection',
                        :parent_container_id => parent_section_id, :parent_container_type => "ForumSection",
                        :viewed => 0,status: 0, :tiding_type => "ForumSection",extra: extra)
        end
      else
        status = -1
        msg = "申请失败，请稍后重试"
      end
    end

    {status: status, message: msg }
  end

  #待审核的帖子
  def unchecked_memos params, current_user
    set_forum_section(params[:id])
    return {status: -1, message: "请登录"} unless check_user_permission(current_user, params[:id])
    select_section_ids = [params[:id]]
    unless @forum_section.parent_id.present?
      children_forums = @forum_section.child_ids
      select_section_ids = select_section_ids + children_forums
    #end
    select_section_ids.uniq

    # page = params[:page].to_i
    page = params[:page].to_i > 0 ? (params[:page].to_i - 1) : 0

    offset = page * LIMIT
    memo_forum_section_ids = MemoForum.where(forum_id: select_section_ids).pluck(:memo_id).uniq
    memos_all = Memo.where(hidden:true, published_at: nil, parent_id: nil, id: memo_forum_section_ids).order("created_at desc")

    # memos_all = Memo.where(hidden: true, parent_id: nil, id: memo_forum_section_ids).joins(:memo_forums).where("memo_forums.forum_id in (#{select_section_ids.join(",")})").order("created_at desc")
    memos_count =  memos_all.size

    memos = memos_all.limit(LIMIT).offset(offset)
    memos_lists = []
    memos.each do |memo|
      user = memo.author
      is_banned = user_is_banned?(user)
      if memo.memo_forums.exists?(is_children: true)
        memo_min_sections = memo.memo_forums.where(is_children: true).first
      else
        memo_min_sections = memo.memo_forums.first
      end
      memo_last_section = memo_min_sections&.forum_section

      memo_list = {
        memo_id: memo.id,
        is_banned: is_banned,
        memo_title: memo.subject,
        username: user.try(:show_real_name),
        login: user.try(:login),
        image_url: "#{url_to_avatar(user)}?#{Time.now.to_i}",
        user_url: "/users/#{user.try(:login)}",
        user_id: user.try(:id),
        time: time_from_now(memo.updated_at),
        forum_title: memo_last_section.try(:title),
        forum_id: memo_last_section.try(:id),
        forum_url: "/memos/forum_memos/#{memo_last_section.try(:id)}",
      }
      memos_lists.push(memo_list)
    end
    {status:0, memos_count: memos_count, memos_lists: memos_lists, limit: LIMIT}
  end

  def unchecked_replies params, current_user
    set_forum_section(params[:id])
    return {status: -1, message: "请登录"} unless check_user_permission(current_user, params[:id])

    select_section_ids = [params[:id]]
    unless @forum_section.parent_id.present?
      children_forums = @forum_section.child_ids
      select_section_ids = select_section_ids + children_forums
    # end
    select_section_ids.uniq

    # page = params[:page].to_i
    page = params[:page].to_i > 0 ? (params[:page].to_i - 1) : 0

    offset = page * LIMIT
    #全部的父帖子
    parent_memos_ids = Memo.where(parent_id: nil).joins(:memo_forums).where("memo_forums.forum_id in (#{select_section_ids.join(",")})").pluck(:id).uniq
    memos_all = Memo.where(hidden:true,published_at: nil, parent_id: parent_memos_ids).order("created_at ASC")
    memos_count =  memos_all.size

    memos = memos_all.limit(LIMIT).offset(offset)
    memos_lists = []

    memos.each do |memo|
      user = memo.author
      is_banned = user_is_banned?(user)
      parent_memo = Memo.find_by_id(memo.parent_id)

      memo_list = {
        is_banned: is_banned,
        reply_id: memo.id,
        reply_content: memo.content,
        username: user.try(:show_real_name),
        login: user.try(:login),
        image_url: "#{url_to_avatar(user)}?#{Time.now.to_i}",
        user_url: "/users/#{user.try(:login)}",
        user_id: user.try(:id),
        time: time_from_now(memo.updated_at),
        source_title: parent_memo.try(:subject),
        source_id: parent_memo.try(:id),
      }
      memos_lists.push(memo_list)
    end
    {status:0, replies_count: memos_count, replies_lists: memos_lists, limit: LIMIT}
  end

  def checked_memos params, current_user
    set_forum_section(params[:id])
    return {status: -1, message: "请登录"} unless check_user_permission(current_user, params[:id])

    select_section_ids = [params[:id]]
    # unless @forum_section.parent_id.present?
      children_forums = @forum_section.child_ids
      select_section_ids = select_section_ids + children_forums
    # end
    select_section_ids.uniq

    # page = params[:page].to_i
    page = params[:page].to_i > 0 ? (params[:page].to_i - 1) : 0

    offset = page * LIMIT
    #全部的父帖子
    memo_forum_section_ids = MemoForum.where(forum_id: select_section_ids).pluck(:memo_id).uniq
    memos_all = Memo.where(hidden: false,parent_id: nil, forum_section_id: select_section_ids).order("created_at desc")
    # memos_all = Memo.where(hidden: false, parent_id: nil).joins(:memo_forums).where("memo_forums.forum_id in (#{select_section_ids.join(",")})")
    if params[:type].present?
      if params[:type] == "sticky"
        memos_all = memos_all.where(sticky: true)
      end

      if params[:type] == "is_fine"
        memos_all = memos_all.where(is_fine: true)
      end
    end
    memos_all = memos_all.order("sticky desc, is_fine desc,published_at desc")

    memos_count =  memos_all.size

    memos = memos_all.limit(LIMIT).offset(offset)
    memos_lists = []

    memos.each do |memo|
      user = memo.author
      is_banned = user_is_banned?(user)
      if memo.memo_forums.exists?(is_children: true)
        memo_min_sections = memo.memo_forums.where(is_children: true).first
      else
        memo_min_sections = memo.memo_forums.first
      end
      memo_last_section = memo_min_sections&.forum_section

      memo_list = {
        memo_id: memo.id,
        is_banned: is_banned,
        memo_title: memo.subject,
        username: user.try(:show_real_name),
        login: user.try(:login),
        image_url: "#{url_to_avatar(user)}?#{Time.now.to_i}",
        user_url: "/users/#{user.try(:login)}",
        time: time_from_now(memo.updated_at),
        forum_title: memo_last_section.try(:title),
        forum_id: memo_last_section.try(:id),
        forum_url: "/memos/forum_memos/#{memo_last_section.try(:id)}",
        is_fine: memo.is_fine,
        sticky: memo.sticky
      }
      memos_lists.push(memo_list)
    end
    {status:0, memos_count: memos_count, memos_lists: memos_lists, limit: LIMIT}
  end

  def forum_section_header params, current_user
    forum_section = ForumSection.find_by_id(params[:id])
    bread_crumb = get_bread_crumb(forum_section, current_user)
    {status: 0, bread_crumb: bread_crumb}
  end


  def edit_notice params
    forum_section = ForumSection.find_by_id(params[:id])
    return {status: -1, message: "版块不存在"} if forum_section.blank?
    return {status: -1, message: "请输入公告内容"} if params[:content].blank?
    notice = forum_section&.section_notice
    if notice.present?
      notice.update_attribute(:content, params[:content])
      message = "公告修改成功"
    else
      SectionNotice.create!(forum_section_id: params[:id], content: params[:content], user_id: forum_section.user_id)
      message = "公告添加成功"
    end
    return {status: 1, message: message}
  end

  protected

  def set_forum_section(section_id)
    @forum_section = ForumSection.find(section_id)
    unless  @forum_section.present?
       {status: 404}
    end
  end

  def check_user_permission(current_user, forum_id)
    if current_user.blank?
      check_user_permission = false
    else
      if @forum_section.parent_id.present?
        parent_section_id = @forum_section.parent_id
      else
        parent_section_id = forum_id
      end
      check_user_permission = (current_user.admin? || ForumModerator.where(forum_section_id: parent_section_id, user_id: current_user.id))

    end
    check_user_permission
  end

  # 将数据库对象转换成哈希对象
  def object_to_hash objects
    objects.map{|o| o.attributes.dup}
  end


end