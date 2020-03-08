json.activities @activities do |activity|
  json.(activity, :course_act_id, :course_act_type)
  json.author do
    user = activity.user
    json.name user.real_name
    json.login user.login
    json.img url_to_avatar(user)
  end
  json.created_at activity.created_at.strftime('%m-%d %H:%M:')
  json.container_name activity.container_name
  json.container_type activity.course_act_type == "HomeworkCommon" ? activity.course_act&.homework_type : ""
end