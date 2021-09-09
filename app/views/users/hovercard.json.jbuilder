json.id @user.id
json.login @user.login
json.name @user.full_name
json.location @user.location
json.image_url url_to_avatar(@user)
json.url "#{request.base_url }/#{@user.login}"
json.followers_count @user.followers_count
json.followers_url "#{base_url}/#{@user.login}/fan_users"
json.following_count @user.following_count
json.following_url "#{base_url}/#{@user.login}/watchers"
json.projects_count @user.projects_count
json.projects_url "#{base_url}/#{@user.login}"
json.projects_count @user.projects_count
json.is_watch current_user&.watched?(@user)
json.organizations @user.organizations do |organization|
  json.login organization.login
  json.name organization.real_name
  json.image_url url_to_avatar(organization)
  json.url "#{base_url}/#{organization.login}"
end