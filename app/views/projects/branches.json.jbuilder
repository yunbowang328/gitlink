json.array! @branches do |branch|
  json.name branch['name']
  json.user_can_push branch['user_can_push']
  json.user_can_merge branch['user_can_merge']
  json.protected branch['protected']
  json.http_url render_http_url(@project)
  json.zip_url render_zip_url(@project, branch['name'])
  json.tar_url render_tar_url(@project, branch['name'])
  json.last_commit do
    json.id branch['commit']['id']
    json.message branch['commit']['message']
    json.timestamp render_unix_time(branch['commit']['timestamp'])
    json.time_from_now time_from_now(branch['commit']['timestamp'])
  end

  user = User.find_by_login branch['commit']['author']['name']
  json.author do
    if user
      json.login user.login
      json.image_url url_to_avatar(user)
    else
      json.nil
    end
  end
end
