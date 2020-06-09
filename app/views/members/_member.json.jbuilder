json.id user.id
json.name user.real_name
json.login user.login
json.image_url url_to_avatar(user)
json.email user.try(:mail)
json.token get_user_token(user.try(:login),@project.try(:identifier))
