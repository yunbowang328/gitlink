class MyMemosService
  include ApplicationHelper
  include ApiIndexHelper

  LIMIT = 10


  def index params, current_user
    memo_user = User.find_by_login(params[:login])
    memo_type = params[:memo_type] || "memos"
    return {status: -1, message: "用户不存在"} unless memo_user
    return {status: 403, message: "没有权限"} if !%w(memos replies).include?(memo_type) && current_user&.login != params[:login]
    return {status: 403, message: "没有权限"} if params[:is_hidden] == "hidden" && current_user&.login != params[:login]
    banned_permission = user_banned_permission current_user, nil
    page = params[:page].to_i > 0 ? (params[:page].to_i - 1) : 0
    index_limit = params[:limit] || 15
    offset = page * index_limit.to_i
    all_memos = ListMemosService.new.all_memos(memo_type, params, memo_user.id, current_user.id)
    memos_count = all_memos.size # 帖子的总数
    if memo_type == "replies"
      all_memos = all_memos.order("last_reply_on desc")
    else
      all_memos = all_memos.order("sticky desc, is_fine desc, published_at desc, updated_at desc")
    end
    all_memos = all_memos.limit(index_limit.to_i).offset(offset)
    show_last_reply = memo_type == "replies"
    all_memo_lists = get_memo_lists(all_memos, show_last_reply, current_user, show_last_reply)
    {
      status: 0,
      is_current_user: params[:login] == current_user&.login,
      banned_permission: banned_permission,
      limit: index_limit.to_i,
      memos_count: memos_count,
      memos: all_memo_lists
    }

  end

  def my_interested params, current_user
    return {status: -1, message: "请登录"} unless current_user
    return {status: 403, message: "没有权限"} if current_user&.login != params[:login]
    page = params[:page].to_i > 0 ? (params[:page].to_i - 1) : 0
    index_limit = params[:limit] || 32
    offset = page * index_limit.to_i

    watch_section_ids = Watcher.where(watchable_type: "ForumSection",user_id: current_user.id).pluck(:watchable_id)

    forum_sections = ForumSection.where(id: watch_section_ids).select([:id,:title, :memos_count])
    if params[:search].present?
      forum_sections = forum_sections.where("title like ? ", "%#{params[:search].to_s.strip}%")
    end
    forum_sections_count = forum_sections.size # 帖子的总数
    forum_sections = forum_sections.limit(index_limit).offset(offset)
    all_forum_sections = forum_sections.as_json.map{|k,v| k["forum_section"]}
    {
      count: forum_sections_count,
      forum_details: all_forum_sections,
    }
  end

  def recommend_memos current_user
    return {status: -1, message: "请登录"} unless current_user

    all_memos = Memo.includes(memo_forums: :forum_section,author: :user_extensions)

    all_hottest_memos = all_memos.visible.hottest_five_memos
    hottest_memos = object_to_hash(all_hottest_memos)

    all_recommend_memos = all_memos.visible.recommend_five_memos
    recommend_memos = object_to_hash(all_recommend_memos)

    {
      status: 0,
      hottest_memos: hottest_memos,
      recommend_memos: recommend_memos,
    }
  end

  def replies_memos params, current_user
    return {status: -1, message: "请登录"} unless current_user
    reply_root_ids = Memo.visible.user_replies(current_user.id).pluck(:root_id)
    reply_memos = Memo.where(id: reply_root_ids)
    page = params[:page].to_i > 0 ? (params[:page].to_i - 1) : 0
    # page = params[:page].to_i
    offset = page * 15
    is_hidden = params[:is_hidden].present? && params[:is_hidden] != "show"
    reply_memos = reply_memos.where(forum_section_id: params[:forum_section_id]) if params[:forum_section_id].present?
    reply_memos = reply_memos.where(hidden: is_hidden) if is_hidden

    reply_memos_count = reply_memos.size # 帖子的总数
    reply_memos = reply_memos.order("updated_at desc").limit(15).offset(offset)
    reply_list_memos = reply_memo_lists(reply_memos)
    {
      status: 0,
      memos_count: reply_memos_count,
      memos: reply_list_memos
    }
  end

  private

  def my_page_crumb(tab,current_user)
    {
      user:{login: current_user.try(:login), url: "/users/#{current_user.try(:login)}"},
      forum: {title: "论坛交流", url: ""},
      forum_tag: tab
    }
  end

  def reply_memo_lists(memos)
    memos_array = []
    memos.each do |memo|
      last_reply = memo&.last_reply_memo(false)
      memo_list = {
        id: memo.id,
        subject: memo.subject,
        reply_time: rename_time_second(last_reply&.created_at),
        reply_content: last_reply&.content
      }
      memos_array.push(memo_list)
    end
    return memos_array
  end

  def get_sections_lists parent, forum_second_ids,children_section_ids
    forum_second_tags = ForumSection.where(id: (forum_second_ids & children_section_ids).uniq)&.select([:id,:title])
      {id: parent.id,
       name: parent.title,
       position: parent.position,
       children_tags: object_to_hash(forum_second_tags)
      }
  end

end