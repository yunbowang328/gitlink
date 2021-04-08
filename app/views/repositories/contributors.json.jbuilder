total_count = @contributors.size 
json.contributors @contributors.each do |contributor|
  user = User.find_by(gitea_uid: contributor["id"])
  if contributor["login"] == "root" 
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


