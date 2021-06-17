json.partial! "commons/success"
json.all_count @all_issues.size
json.open_count @open_issues.size
json.close_count @close_issues.size
json.merged_issues_size @merged_issues.size
json.search_count @issues_size
json.limit @limit
json.user_admin_or_member @user_admin_or_member
json.project_name @project.name
json.project_author_name @project.owner.try(:login)

json.issues do
  json.array! @issues.to_a do |issue|
    pr = issue.pull_request
    json.pull_request_id pr.id
    json.pull_request_status pr.status
    json.pull_request_head pr.head 
    json.pull_request_base pr.base
    json.pull_request_staus pr.status == 1 ? "merged" : (pr.status == 2 ? "closed" : "open")
    json.is_original pr.is_original
    json.fork_project_id pr&.fork_project_id
    json.fork_project_identifier pr&.fork_project&.identifier
    json.fork_project_user pr&.fork_project&.owner.try(:login)

    
    json.id issue.id
    json.name issue.subject
    json.pr_time time_from_now(pr.status == 1 ? pr.updated_at : issue.updated_on)
    json.assign_user_name issue.get_assign_user.try(:show_real_name)
    json.assign_user_login issue.get_assign_user.try(:login)
    json.author_name issue.user.try(:show_real_name)
    json.author_login issue.user.try(:login)
    json.avatar_url url_to_avatar(issue.user)
    json.priority issue.priority.try(:name)
    json.version issue.version.try(:name)
    json.journals_count issue.get_journals_size
    json.issue_tags issue.get_issue_tags
  end
end

