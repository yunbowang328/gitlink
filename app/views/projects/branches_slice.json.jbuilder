json.array! @branches_slice do |branch_slice|
  json.branch_type branch_slice['branch_name']
  json.list branch_slice['branches'].each do |branch|
    json.name branch['name']
    json.user_can_push branch['user_can_push']
    json.user_can_merge branch['user_can_merge']
    json.protected branch['protected']
    json.http_url render_http_url(@project)
    json.zip_url render_zip_url(@owner, @repository, branch['name'])
    json.tar_url render_tar_url(@owner, @repository, branch['name'])
    json.last_commit do
      json.sha branch['commit']['id']
      json.message branch['commit']['message']
      json.timestamp render_unix_time(branch['commit']['timestamp'])
      json.time_from_now time_from_now(branch['commit']['timestamp'])
      json.author do 
        json.partial! 'repositories/commit_author', user: render_commit_author(branch['commit']['author']), name: branch['commit']['author']['name']
      end
      json.committer do 
        json.partial! 'repositories/commit_author', user: render_commit_author(branch['commit']['committer']), name: branch['commit']['committer']['name']
      end
    end
  end
end