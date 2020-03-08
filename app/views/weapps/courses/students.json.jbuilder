json.students student_list @students, @course.excellent, @user_course_identity
json.students_count @students_count
if @course_group
  json.course_group do
    json.(@course_group, :id, :name, :invite_code, :course_members_count)
  end
end