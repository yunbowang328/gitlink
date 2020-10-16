class ListMemosService

  def all_memos(memo_type, params, target_user_id, current_user_id)
    hidden = params[:is_hidden].to_s == "hidden"
    is_show = params[:is_hidden].to_s == "show"
    start_time = params[:start_time]
    end_time = params[:end_time]

    all_memos = Memo.includes(:forum_section,author: :user_extension)

    all_memos = all_memos.where(forum_section_id: params[:forum_section_id]) if params[:forum_section_id].present?
    if target_user_id != current_user_id
      all_memos = all_memos.visible
    else
      all_memos = all_memos.hidden_memos if hidden
      all_memos = all_memos.visible if is_show
    end
    case memo_type
    when "memos"  #我的帖子
      all_memos = all_memos.user_posts(target_user_id)
      all_memos = all_memos.search_by_time("published_at", start_time, end_time) if start_time.present? || end_time.present?
    when "histories"   #我的足迹
      user_watchers = VisitAction.where(visitable_type: "Memo",user_id: current_user_id)
      user_watchers = user_watchers.search_by_time("updated_at", start_time, end_time)  if start_time.present? || end_time.present?
      watcher_memo_ids = user_watchers.pluck(:visitable_id)
      all_memos = all_memos.visible.where(id: watcher_memo_ids).roots

    when "stars"  #我收藏的
      watch_actions = Watcher.where(watchable_type: "Memo", user_id: current_user_id)
      watch_actions = watch_actions.search_by_time("created_at", start_time, end_time) if start_time.present? || end_time.present?
      watch_section_ids = watch_actions.pluck(:watchable_id).reject(&:blank?).uniq
      all_memos = all_memos.where(id: watch_section_ids).roots

    when "replies"
      reply_root_ids = all_memos.user_replies(target_user_id).pluck(:root_id)
      all_memos = all_memos.where(id: reply_root_ids)
      all_memos = all_memos.search_by_time("published_at", start_time, end_time) if start_time.present? || end_time.present?
    else
      all_memos = []
    end
    return all_memos
  end

end