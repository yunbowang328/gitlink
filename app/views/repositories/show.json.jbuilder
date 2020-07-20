json.identifier @project.identifier
json.name @project.name
json.project_id @project.id
json.repo_id @repo.id
json.issues_count @project.issues_count.to_i - @project.pull_requests_count.to_i
json.pull_requests_count @project.pull_requests_count
json.project_identifier @project.identifier
json.praises_count @project.praises_count.to_i
json.forked_count @project.forked_count.to_i
json.watchers_count @project.watchers_count.to_i
json.versions_count @project.versions_count  #里程碑数量
json.version_releases_count @project.releases_size(@user.try(:id), "all")
json.version_releasesed_count @project.releases_size(@user.try(:id), "released")  #已发行的版本
json.contributor_users_count @project.contributor_users
json.permission  User.current.admin? ? "Manager" : @project.get_premission(@user)
json.mirror_url @project&.repository.mirror_url
json.mirror @project&.repository.mirror_url.present?
json.type @project.numerical_for_project_type

unless @project.common?
  json.mirror_status @repo.mirror_status
  json.mirror_num @repo.mirror_num
  json.first_sync @repo.first_sync?
end

json.watched @project.watched_by? @user
json.praised @project.praised_by? @user
json.status @project.status
json.forked_from_project_id @project_fork_id
json.fork_info do
  if @fork_project.present?
    json.fork_form_name @fork_project.try(:name)
    json.fork_project_user_login @fork_project_user.try(:login)
    json.fork_project_user_name @fork_project_user.try(:show_real_name)
  end
end

if @result
  json.size replace_bytes_to_b(number_to_human_size(@result['size'].to_i*1024))
  json.ssh_url @result['ssh_url']
  json.clone_url @result['clone_url']
  json.default_branch @result['default_branch']
  json.empty @result['empty']
  json.full_name @result['full_name']
  json.private @result['private']
end

json.partial! 'author', locals: { user: @project.owner }
