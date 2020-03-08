json.username @user.full_name
json.real_name @user.real_name
json.login @user.login
json.user_id @user.id
json.image_url url_to_avatar(@user)
json.admin @user.admin?
json.business @user.business?
json.is_teacher @user.user_extension&.teacher?
json.user_identity @user.identity
json.tidding_count 0
json.user_phone_binded @user.phone.present?
json.phone @user.phone
json.email @user.mail
json.profile_completed @user.profile_completed?
json.professional_certification @user.professional_certification
json.main_site current_laboratory.main_site?
json.is_shixun_marker current_user.is_shixun_marker? || current_user.admin_or_business?
if @course
  json.course_identity @course_identity
  json.course_name @course.name
  json.course_public @course.is_public
  json.course_excellent @course.excellent
  if params[:group_info]
    json.group_info @course.teacher_group(@user.id) if @course_identity < Course::STUDENT
  end
  json.first_category_url module_url(@course.none_hidden_course_modules.first, @course)
  json.course_is_end @course.is_end
end

if params[:school]
  json.user_school @user.school_name
end
