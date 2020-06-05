# user = target.watchable 

json.format_time target.created_at.strftime("%Y-%m-%d")
json.name user.try(:show_real_name)
json.login user.try(:login)
json.image_url url_to_avatar(user)
json.is_current_user current_user.try(:id) == target.user_id
json.is_watch current_user&.watched?(user)
