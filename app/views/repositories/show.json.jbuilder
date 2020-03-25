json.identifier @project.identifier
json.name @project.name
json.project_id @project.id
json.issues_count @project.issues_count
json.pull_requests_count @project.pull_requests_count
json.project_identifier @project.identifier
json.praises_count @project.praises_count
json.forked_count @project.forked_count
json.watchers_count @project.watchers_count
json.branches_count @branches_count
json.commits_count @commits_count
json.permission render_edit_project_permission(current_user, @project) if current_user
json.mirror_url @project&.repository.mirror_url
json.watched current_user&.watched?(@project)
json.praised current_user&.liked?(@project)
json.size @result['size']
json.ssh_url @result['ssh_url']
json.clone_url @result['clone_url']
json.default_branch @result['default_branch']
json.empty @result['empty']
json.full_name @result['full_name']
json.mirror @result['mirror']
json.private @result['private']
json.partial! 'author', locals: { user: @project.owner }
