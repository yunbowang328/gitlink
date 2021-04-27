if user.present?
  json.id user.id
  json.type user.type
  json.name user.real_name
  json.login user.login
  json.image_url url_to_avatar(user)
else 
  json.nil!
end