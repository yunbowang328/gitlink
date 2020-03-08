json.username @user.full_name
json.login @user.login
json.user_id @user.id
json.image_url url_to_avatar(@user)
json.admin @user.admin
json.is_teacher @user.user_extension.teacher?