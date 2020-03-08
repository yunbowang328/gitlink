json.(@course, :id, :name, :course_members_count, :credit, :invite_code_halt)
json.teachers_count @course.teachers.count
json.students_count @course.students.count
json.course_identity @current_user.course_identity(@course)