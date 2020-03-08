json.users do
  json.array! @users do |user|
    json.id user.id
    json.login user.login
    json.name user.real_name
    json.student_id user&.student_id
    json.school_name user&.school_name
    json.added @course.course_member?(user.id, 4)
  end
end
json.users_count @users_count