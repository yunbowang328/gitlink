json.students do
  json.array! @students do |student|
    json.user_id student.user_id
    json.login student.user.try(:login)
    json.name student.user.try(:real_name)
    json.name_link user_path(student.user)
    json.student_id student.user.try(:student_id)
    json.course_group_name student.course_group_name
    json.course_member_id student.id
    if @user_course_identity < Course::ASSISTANT_PROFESSOR && !params[:course_group_id].present?
      json.member_roles student.user.course_role(@course)
    end
    json.user_phone @course.excellent ? "" : student.user.hidden_phone
    json.user_mail @course.excellent ? "" : student.user.hidden_mail
  end
end
json.students_count @students_count
if @course_group.present?
  json.course_group_name @course_group.name
  json.invite_code @course_group.invite_code
end