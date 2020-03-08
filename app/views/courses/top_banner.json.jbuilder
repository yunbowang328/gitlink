json.name @course.name
json.teacher_name @course.teacher.real_name
json.teacher_login @course.teacher.login
json.teacher_img url_to_avatar(@course.teacher)
json.teacher_school @course.school.try(:name)
json.teacher_count @course.course_member_count([1, 2, 3])
json.student_count @course.course_member_count(4)
json.course_group_count @course.course_groups_count
json.credit @course.credit
json.course_end @course.is_end
json.deadline course_end_date @course.end_date
json.educoder_teacher @user.is_teacher?
#json.is_student @is_student
json.is_admin @user_course_identity < Course::PROFESSOR
json.is_public @course.is_public == 1
json.code_halt @course.invite_code_halt == 1
json.invite_code @course.invite_code_halt == 0 ? @course.generate_invite_code : ""
json.switch_to_student @switch_student
json.switch_to_teacher switch_teacher_role(@is_student, @course, @user)
json.switch_to_assistant switch_assistant_role(@is_student, @course, @user)
#json.join_course !@user.member_of_course?(@course)
#json.copy_course !@user.member_of_course?(@course) && @user.is_teacher?
json.course_identity @user_course_identity
json.excellent @course.excellent
if @course.is_end == 0
  json.days_remaining (@course.end_date.to_date - Time.now.to_date).to_i
end
json.teacher_applies_count CourseMessage.unhandled_join_course_requests_by_course(@course).size if @user_course_identity < Course::ASSISTANT_PROFESSOR