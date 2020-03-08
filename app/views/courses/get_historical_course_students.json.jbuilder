json.students do
  json.array! @students do |student|
    json.user_id student.user_id
    json.name student.user.real_name
    json.student_id student.user.student_id
    json.school_name student.user.school_name
  end
end
json.students_count @students_count