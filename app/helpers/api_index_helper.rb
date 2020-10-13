module ApiIndexHelper

  #当前用户在论坛模块是否被禁言
  def user_is_banned?(user)
    return false if user.blank?
    (user&.banned_forums&.where(is_banned: true).exists? && !user.admin?)
  end

  def format_for_current_user(current_user)
    if current_user.present? && (current_user.id != 2)
      {username: current_user.show_real_name, 
      login: current_user.login,
       user_id: current_user.id, 
       image_url: "/images/#{url_to_avatar(current_user)}?#{Time.now.to_i}",
       admin: current_user.admin?,
       user_url: "/users/#{current_user.try(:login)}",
       is_banned: user_is_banned?(current_user), 
       tidding_count: unviewed_tiddings(current_user)
      }
    else
      {}
    end
  end

  def format_common_user(user)
    {username: user.show_real_name, 
      user_id: user.id,
      login: user.login,
      image_url: "/images/#{url_to_avatar(user)}?#{Time.now.to_i}",
      admin: user.admin?,
      user_url: "/users/#{user.try(:login)}"
     }
  end

  def get_bread_crumb(forum_section, current_user)
    if forum_section.present?
      is_children = forum_section&.parent_id&.present?
      children_bread_crumb = nil
      if is_children
        children_bread_crumb = {
          title: forum_section.try(:title),
          id: forum_section.try(:id)
        }
        forum_section_tag = {
          title: forum_section.parent_forum.try(:title),
          id:forum_section.try(:parent_id),
          children_bread_crumb: children_bread_crumb
        }
      else
        if forum_section&.children_forum.present?
          children_bread_crumb = object_to_hash(forum_section&.children_forum&.select([:id, :title]))
        end
        # children_bread_crumb = object_to_hash(forum_section&.children_forum&.select([:id, :title])) if forum_section&.children_forum.present?
        forum_section_tag = {
          title: forum_section.try(:title),
          id: forum_section.try(:id),
          children_bread_crumb: children_bread_crumb
        }
      end
    else
      is_children = false
      forum_section_tag = nil
    end

    {
      is_children: is_children,  #是否为二级分类
      user:{login: current_user.try(:login), url: "/users/#{current_user.try(:login)}"},
      forum: {title: "论坛交流", url: ""},
      forum_tag: forum_section_tag
    }
  end

  def get_user_ip(ip)
    addr = "--"
    unless ip.nil?
      result = SM.find_by_ip(ip)
      if result.present?
        addr = "#{result[:province]}-#{result[:city]}"
      end
    end
    return addr
  end

  def get_children_sections(children_sections)
    children_forum_users = []
    children_sections.each do |children|
      children_users_array = []
      children_users = children.forum_moderators.children_moder
      children_users.each do |moder|
        user = moder.user
        children_user_hash = {
          moderator_id: moder.id,
          user_id: user.id,
          login: user.login,
          username: user.try(:show_real_name),
          image_url: url_to_avatar(user),
          user_url: "/users/#{user.try(:login)}"
        }
        children_users_array.push(children_user_hash)
      end
      children_forums = {
        id: children.id,
        title: children.title,
        forum_moderators: children_users_array  #二级分类的管理者
      }
      children_forum_users.push(children_forums)
    end
    children_forum_users
  end

  #论坛的全部一级分类和二级分类
  def all_sections(is_detail)
    forum_all_tags = []
    forum_first_tags = ForumSection.roots.select([:id, :title, :ancestry, :position]).order("position desc")
    forum_first_tags.each do |forum|
      forum_second_tags = forum.children.includes(:user)
      forum_hash =
        {id: forum.id,
         name: forum.title,
         children_tags: set_children_sections(forum_second_tags,is_detail)
        }
      forum_all_tags.push(forum_hash)
    end
    forum_all_tags
  end

  # 将数据库对象转换成哈希对象
  def object_to_hash objects
    objects.map{|o| o.attributes.dup}
  end

  def set_children_sections(objects,is_detail)
    children_sections_array = []
    objects.find_each do |sec|
      image = sec.attachments&.last
      s_section = {
        id: sec.id,
        title: sec.title
      }
      if is_detail
        s_section.merge!({
        picture: image.present? ? "/attachments/download/" + "#{image.id}" + "/" + "#{image.filename}" : "",
        description: sec.description,
        memos_count: sec.visible_memos_count,
        user_name: sec.user.try(:show_real_name),
        user_login: sec.user.try(:login)
        })
      end
      children_sections_array.push(s_section)
    end
    return children_sections_array
  end

  def unviewed_tiddings current_user
    current_user_onclick_time = current_user.onclick_time.onclick_time
    new_tidings_count = current_user.tidings.where("created_at > '#{current_user_onclick_time}'").length
    new_pri_message_count = current_user.private_messages.where("created_at > '#{current_user_onclick_time}'").length
    count = new_tidings_count + new_pri_message_count
    return count
  end

  #给论坛管理员发信息
  def create_user_tidings memo, type
    memo_parent_id = ""
    memo_parent_type = ""
    if memo.parent_id.present?
      memo_parent_id = memo.parent_id
      memo_parent_type = "Memo"
    end
    user_ids = User.select(:admin, :id).admin_users.pluck(:id)
    # admin_role_ids= AdminRole.includes(:admin_permissions).joins(:admin_permissions).where("admin_permissions.name = '#{type}'").pluck(:id)
    # user_ids = UserAdminRole.where(admin_role_id: admin_role_ids).pluck(:user_id).uniq
    if user_ids.size > 0
      user_ids.each do |id|
        Tiding.create(:user_id => id, :trigger_user_id => memo.author_id,
                      container_id: memo.id, container_type: 'Memo',
                      :parent_container_id => memo_parent_id, :parent_container_type => memo_parent_type,
                      :viewed => 0, :tiding_type => "Memo")
      end
    else
      Tiding.create(:user_id => 1, :trigger_user_id => memo.author_id,
                    container_id: memo.id, container_type: 'Memo',
                    :parent_container_id => memo_parent_id, :parent_container_type => memo_parent_type,
                    :viewed => 0, :tiding_type => "Memo")
    end
  end

  def user_banned_permission current_user, forum_id
    if current_user.present?
      if forum_id.present?
        user_forum_moder = ForumModerator.where(forum_section_id: forum_id,user_id: current_user.id).exists?
      else
        user_forum_moder = false
      end
      permission_user = (current_user.admin? || current_user.admin_permission?('forum_post') || user_forum_moder)
    else
      permission_user = false
    end
    permission_user
  end


  def rename_time_day(time)
    return "" if time.blank?
    time.strftime("%Y-%m-%d")
  end

  def rename_time_second(time)
    return "" if time.blank?
    time.strftime("%Y-%m-%d %H:%M:%S")
  end

  def rename_time_minute(time)
    return "" if time.blank?
    time.strftime("%Y-%m-%d %H:%M")
  end

  def get_memo_lists(all_memos, last_reply, current_user, show_hidden_memo)
    memo_lists = []
    all_memos.field_for_list.each do |memo|
      if last_reply
        last_memo = memo&.last_reply_memo(show_hidden_memo)
        if last_memo
          new_reply = {
            username: last_memo&.author.try(:show_real_name),
            user_login: last_memo&.author.try(:login),
            user_id: last_memo&.author.try(:id),
            content: last_memo&.content,
            time: time_from_now(last_memo&.created_at),
            published_time: rename_time_second(last_memo&.created_at)
          }
        end
      end
      memo_section = memo&.forum_section
      memo_watched = memo.watched_by?(current_user)
      banned_permission = user_banned_permission current_user, memo.forum_section_id
      memo = {
        id: memo.id,
        subject: memo.try(:subject),
        tag_name: memo.meno_tag_name,
        sticky: memo.sticky,
        is_fine: memo.is_fine,
        is_original: memo.is_original,
        username: memo.author.show_real_name,
        image_url: "#{url_to_avatar(memo.author)}?#{Time.now.to_i}",
        user_login: memo.author.try(:login),
        user_id: memo.author.try(:id),
        memo_watched:memo_watched,
        replies_count: memo.can_see_reply_count(current_user),
        praises_count: memo.praises_count,
        viewed_count: memo.viewed_count,
        published_time: rename_time_day(memo.published_at),
        forum_section_id: memo_section.try(:id),
        forum_section_title: memo_section.try(:title),
        new_reply: new_reply || nil,
        apply_destroy: current_user&.id == memo.author_id && memo.apply_destroy?,
        banned_permission: banned_permission
      }
      memo_lists << memo
    end
    memo_lists
  end

  def get_all_sections(sections)
    section_item = []
    sections.each do |tag|
      children_tags = tag.children.as_json(only: [:id, :title]).map{|k| k["forum_section"]}
      section_item.push({
        id: tag.id,
        title: tag.title,
        childrens: children_tags
      })
    end
    return section_item
  end

end
