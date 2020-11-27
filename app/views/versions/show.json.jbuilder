json.partial! "commons/success"
json.issues_count @version.issues_count
json.open_issues_count @version.issues_count - @version.closed_issues_count
json.close_issues_count @version.closed_issues_count
json.limit @limit
json.user_name @version.version_user.try(:show_real_name)
json.user_login @version.version_user.try(:login)
json.created_at format_time(@version.created_on)
json.updated_at format_time(@version.updated_on)
json.search_count @version_issues_size
json.percent @version.percent*100
json.extract! @version, :id,:name,:project_id,:description, :effective_date, :status, :sharing,:wiki_page_title

json.issues do
  json.array! @version_issues.each.to_a do |issue|
    # cost_time(issue)
    json.id issue.id
    json.name issue.subject
    json.format_time format_time(issue.created_on)
    json.created_at time_from_now(issue.created_on)
    json.updated_at format_time(issue.updated_on)
    json.assign_user_name issue.get_assign_user.try(:show_real_name)
    json.assign_user_login issue.get_assign_user.try(:login)
    json.author_name issue.user.try(:show_real_name)
    json.author_login issue.user.try(:login)
    json.tracker issue.tracker.try(:name)
    json.issue_status issue.issue_status.try(:name)
    json.priority issue.priority.try(:name)
    json.version issue.version.try(:name)
    json.done_ratio issue.done_ratio.to_s + "%"
    json.journals_count issue.get_journals_size
    json.issue_tags issue.get_issue_tags
    json.issue_type issue.issue_type == "1" ? "普通" : "悬赏"
    json.token issue.issue_type == "2" ? issue.token : ""
    json.issue_classify issue.issue_classify
    json.branch_name issue.branch_name
    # json.cost_time @all_cost_time
  end
end



