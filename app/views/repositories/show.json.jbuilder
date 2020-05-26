json.identifier @project.identifier
json.name @project.name
json.project_id @project.id
json.repo_id @project.repository.id
json.issues_count @project.issues_count
json.pull_requests_count @project.pull_requests_count
json.project_identifier @project.identifier
json.praises_count @project.praises_count.to_i
json.forked_count @project.forked_count.to_i
json.watchers_count @project.watchers_count.to_i
json.versions_count @project.versions_count  #里程碑数量
json.version_releases_count @project.releases_size(current_user.try(:id), "all")
json.version_releasesed_count @project.releases_size(current_user.try(:id), "released")  #已发行的版本
json.contributor_users_count @project.contributor_users
json.issue_tags_count @tags_count
json.branches_count @branches_count
json.commits_count @commits_count
json.permission render_edit_project_permission(current_user, @project) if current_user
json.mirror_url @project&.repository.mirror_url
json.watched current_user&.watched?(@project)
json.praised current_user&.liked?(@project)
json.status @project.status
json.forked_from_project_id @project_fork_id
json.fork_info do
  if @fork_project.present?
    json.fork_form_name @fork_project.try(:name)
    json.fork_project_user_login @fork_project_user.try(:login)
    json.fork_project_user_name @fork_project_user.try(:show_real_name)
  end
end

json.size number_to_human_size(@result['size'].to_i)
json.ssh_url @result['ssh_url']
json.clone_url @result['clone_url']
json.default_branch @result['default_branch']
json.empty @result['empty']
json.full_name @result['full_name']
json.mirror @result['mirror']
json.private @result['private']
json.partial! 'author', locals: { user: @project.owner }
