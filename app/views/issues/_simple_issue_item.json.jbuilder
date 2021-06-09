json.name issue.try(:subject)
json.issue_type issue.issue_type == "1" ? "普通" : "悬赏"
json.status_id issue.try(:status_id)
json.issue_status issue.issue_status.try(:name)
json.priority issue.priority.try(:name)
json.priority_id issue.try(:priority_id)
json.version issue.version.try(:name)
json.created_at format_time(issue.try(:created_on))
json.updated_at format_time(issue.try(:updated_on))
json.assign_user_name issue&.get_assign_user.try(:show_real_name)
json.assign_user_login issue&.get_assign_user.try(:login)
json.issue_journal_size issue&.get_journals_size
journals = issue&.only_reply_journals

json.issue_journals do
  json.array! journals.to_a.each do |j|
    json.user_name j.user.try(:show_real_name)
    json.user_login j.user.try(:login)
    json.user_avatar url_to_avatar(j.user)
    json.content j.try(:notes)
    json.created_at time_from_now(j.created_on)
  end
end

