# json.partial! 'users/user', locals: { user: @user }

json.username @user.full_name
json.real_name @user.real_name
json.login @user.login
json.user_id @user.id
json.image_url url_to_avatar(@user)
json.admin @user.admin?
json.user_identity @user.identity
json.is_watch current_user&.watched?(@user)
json.watched_count @user.fan_count   #粉丝
json.watching_count @user.follow_count   #关注数
json.undo_events @undo_events
json.user_composes_count @user_composes_count
json.common_projects_count @projects_common_count
json.mirror_projects_count @projects_mirrior_count
json.sync_mirror_projects_count @projects_sync_mirrior_count
json.description @user.description