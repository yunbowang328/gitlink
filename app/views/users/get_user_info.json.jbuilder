json.username @user.full_name
json.real_name @user.real_name
json.login @user.login
json.user_id @user.id
json.image_url url_to_avatar(@user)
json.admin @user.admin?
json.is_teacher @user.user_extension&.teacher?
json.user_identity @user.identity
json.tidding_count 0
json.user_phone_binded @user.phone.present?
# json.phone @user.phone
# json.email @user.mail
json.profile_completed @user.profile_completed?
json.professional_certification @user.professional_certification
json.devops_step @user.devops_step
json.ci_certification @user.ci_certification? if !@user.is_a?(AnonymousUser)
