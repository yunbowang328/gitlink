json.course do
  json.(@course, :id, :name)
  json.code_halt @course.invite_code_halt == 1
  json.invite_code @course.invite_code_halt == 0 ? @course.generate_invite_code : ""
  json.teacher_name @course.teacher.real_name
  json.teacher_img url_to_avatar(@course.teacher)
  json.teacher_school @course.school.try(:name)
end