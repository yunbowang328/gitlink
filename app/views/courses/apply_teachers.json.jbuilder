json.teacher_list_size @teacher_list_size
json.apply_size @applications_size
json.is_admin @is_admin
json.application_list do
  json.array! @applications do |application|
    json.application_id application.id
    json.user_id application.course_message_id
    json.name application.application_user.real_name
    json.name_link user_path(application.application_user)
    json.login application.application_user.login
    json.image_url url_to_avatar(application.application_user)
    json.school_name application.application_user.school_name
    json.role application.content.to_i == 3 || application.content.to_i == 7 ? "助教" : application.content.to_i == 2 || application.content.to_i == 9 ? "教师" : ""
  end
end