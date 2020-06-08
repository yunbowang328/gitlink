json.partial! "commons/success"
json.all_count @all_issues_size
json.open_count @open_issues_size
json.close_count @close_issues_size
json.assign_me_count @assign_to_me_size
json.my_published_count @my_published_size
json.search_count @issues_size
json.limit @limit
json.user_admin_or_member @user_admin_or_member

json.issues do
  json.array! @issues.to_a do |issue|
    # cost_time(issue)
    json.pull_request_id issue.pull_request.id
    json.pull_request_status issue.pull_request.status
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

# json.issues @issues
