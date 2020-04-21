json.name @user.full_name
json.avatar_url url_to_avatar(@user)
json.is_logged_user @user.logged_user?
json.follow_count @user.follow_count
json.fan_count @user.fan_count
json.identity @user.identity
json.brief_introduction @user.user_extension&.brief_introduction
json.professional_certification @user.professional_certification
json.phone_binded @user.phone_binded?
json.email_binded @user.email_binded?
json.followed User.current.watched?(@user)

# json.id @user.id
# json.name @user.full_name
# json.avatar_url url_to_avatar(@user)
# json.is_logged_user @user.logged_user?
# json.experience @user.experience
# json.grade @user.grade
# json.follow_count @user.follow_count
# json.fan_count @user.fan_count
# json.identity @user.identity
# json.brief_introduction @user.user_extension&.brief_introduction
# json.authentication @user.authentication
# json.professional_certification @user.professional_certification
# json.phone_binded @user.phone_binded?
# json.email_binded @user.email_binded?
# json.college_identifier @user.college_identifier
# json.followed User.current.watched?(@user)
#
# if @user.logged_user?
#   #json.can_apply_trial @user.can_apply_trial?
#   json.attendance_signed @user.attendance_signed?
#   json.tomorrow_attendance_gold @user.tomorrow_attendance_gold
# end
#

