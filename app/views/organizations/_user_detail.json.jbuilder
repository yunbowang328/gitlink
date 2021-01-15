json.user_id user.id
json.login user.login
json.name user.full_name
json.mail user.mail
json.identity user.identity
json.watched current_user.watched?(user)
# json.email user.mail # 邮箱原则上不暴露的，如果实在需要的话只能对某些具体的接口公开
json.image_url url_to_avatar(user)
