json.course_members @course_members.each do |member|
  user = member.user
  json.user_login user&.login
  json.user_name user&.real_name
  # json.course_group member.course_group_name
  json.total_score member.score
end