json.author do
  json.login user.login
  json.name user.real_name
  json.image_url url_to_avatar(user)
end
