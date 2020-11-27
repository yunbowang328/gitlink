json.partial! "commons/success"
json.project_name @project.name
json.pr_time time_from_now(@pull_request.updated_at)
json.commits_count @pull_request.commits_count
json.files_count @pull_request.files_count
json.comments_count @pull_request.comments_count

json.pull_request do
  json.extract! @pull_request, :id,:base, :head, :status,:fork_project_id, :is_original
  json.pull_request_staus @pull_request.status == 1 ? "merged" : (@pull_request.status == 2 ? "closed" : "open")
  json.fork_project_user @pull_request&.fork_project&.owner.try(:login)
end

json.issue do
  json.extract! @issue, :id,:subject,:description,:is_private, :branch_name
  json.project_author_name @project.owner.try(:login)
  #json.user_permission @user_permission
  json.closed_on @issue.closed_on.present? ? format_time(@issue.closed_on) : ""
  json.created_at format_time(@issue.created_on)
  json.assign_user_name @issue_assign_to.try(:show_real_name)
  json.assign_user_login @issue_assign_to.try(:login)
  json.author_name @issue_user.try(:show_real_name)
  json.author_login @issue_user.try(:login)
  json.author_picture url_to_avatar(@issue_user)
  json.issue_status @issue.issue_status.try(:name)
  json.priority @issue.priority.try(:name)
  json.version @issue.version.try(:name)
  json.issue_tags @issue.get_issue_tags
end
