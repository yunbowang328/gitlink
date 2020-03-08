json.partial! 'commons/success'

json.data do
  json.course_id @course.id
  json.user_course_identity @current_user.course_identity(@course)
  json.boards do
    json.array! @boards, :id, :name
  end
  json.email_notify @course.email_notify
end
