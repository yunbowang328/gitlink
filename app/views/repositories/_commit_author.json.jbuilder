if user
  json.id user.id
  json.login user.login
  json.name user.real_name
  json.type user&.type
  json.image_url url_to_avatar(user)
else
  json.id nil
  json.login name 
  json.name name 
  json.type nil
  json.image_url User::Avatar.get_letter_avatar_url(name)
end
