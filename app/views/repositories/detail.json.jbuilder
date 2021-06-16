json.content @project.content
json.website @project.website
json.lesson_url @project.lesson_url
if @result[:readme].blank?
  json.readme nil
else
  json.readme @result[:readme].merge(content: readme_render_decode64_content(@result[:readme]["content"], nil))
end
json.identifier render_identifier(@project)
json.invite_code @project.invite_code
json.name @project.name
json.description  @project.description
json.project_id @project.id
json.repo_id @repository.id
json.issues_count @project.issues_count.to_i - @project.pull_requests_count.to_i - @project.issues.issue_issue.closed.size
json.pull_requests_count @project.pull_requests.opening.size
json.project_identifier render_identifier(@project)
json.praises_count @project.praises_count.to_i
json.forked_count @project.forked_count.to_i
json.watchers_count @project.watchers_count.to_i
json.versions_count @project.versions.opening.size #里程碑数量
json.version_releases_count @project.releases_size(@user.try(:id), "all")
json.version_releasesed_count @project.releases_size(@user.try(:id), "released")  #已发行的版本
json.permission render_permission(@user, @project)
json.mirror_url @project&.repository.remote_mirror_url
json.mirror @project&.repository.mirror_url.present?
json.type @project.numerical_for_project_type
json.open_devops @project.open_devops?

unless @project.common?
  json.mirror_status @repository.mirror_status
  json.mirror_num @repository.mirror_num
  json.first_sync @repository.first_sync?
end

json.watched @project.watched_by? @user
json.praised @project.praised_by? @user
json.status @project.status
json.forked_from_project_id @project_fork_id
json.fork_info do
  if @fork_project.present?
    json.fork_form_name @fork_project.try(:name)
    json.fork_project_user_login @fork_project_user.try(:login)
    json.fork_project_identifier @fork_project.identifier
    json.fork_project_user_name @fork_project_user.try(:show_real_name)
  end
end
if @result[:repo]
  json.size replace_bytes_to_b(number_to_human_size(@result[:repo]['size'].to_i*1024))
  json.ssh_url @result[:repo]['ssh_url']
  json.clone_url @result[:repo]['clone_url']
  json.default_branch @project.educoder? ? "master" : @result[:repo]['default_branch']
  json.empty @result[:repo]['empty']
  json.full_name @result[:repo]['full_name']
  json.private @result[:repo]['private']
end
json.license_name @project.license_name
json.release_versions do
  json.list @result[:release].each do |release|
    forge_version = VersionRelease.find_by(version_gid: release["id"])
    json.id forge_version&.id
    json.name release["name"]
    json.tag_name release["tag_name"]
    json.created_at format_time(release["created_at"].to_time)
  end
  json.total_count @repository&.version_releases.size
end
json.branches do
  json.list @result[:branch].each do |branch|
    json.name branch["name"]
  end
  json.total_count @result[:branch].size
end
json.tags do
  json.list @result[:tag].each do |tag|
    json.name tag["name"]
  end
  json.total_count @result[:tag].size
end
json.contributors do
  total_count = @result[:contributor].size
  json.list @result[:contributor].each do |contributor|
    user = User.find_by(gitea_uid: contributor["id"])
    if contributor["login"] == "root" || user.nil?
      total_count -= 1
      next
    end
    json.contributions contributor["contributions"]
    json.gid contributor["id"]
    json.login user.login
    json.type user&.type
    json.name user.real_name
    json.image_url url_to_avatar(user)
  end
  json.total_count total_count
end
json.languages @result[:language]

json.partial! 'author', locals: { user: @project.owner }
