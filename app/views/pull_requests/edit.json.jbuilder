json.partial! "commons/success"
# json.partial! "pull_requests/merge_item"
json.fork_project_user_name @fork_project_user_name
json.fork_project_user @fork_project_user
json.fork_project_identifier @fork_project_identifier
json.project_author @project.owner.try(:show_real_name)
json.project_name @project.repository.try(:identifier)
json.project_login  @project.owner.try(:login)
json.extract! @pull_request, :id, :title, :body, :milestone,:head,:base,:is_original
json.extract! @issue, :assigned_to_id, :fixed_version_id, :priority_id
json.issue_tag_ids @issue.issue_tags_value.split(",")
