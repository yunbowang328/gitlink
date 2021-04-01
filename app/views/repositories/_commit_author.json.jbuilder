if user
  json.id user.id
  json.login user.login
  json.name user.real_name
  json.image_url url_to_avatar(user)
else
  json.id nil
  json.login name 
  json.name name 
  json.image_url File.join("avatars/User","b")
end
