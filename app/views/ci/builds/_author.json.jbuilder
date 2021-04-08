json.id user.id
json.name user.real_name == '游客' ? '-' : user.real_name
json.login user.login
json.image_url url_to_avatar(user)
