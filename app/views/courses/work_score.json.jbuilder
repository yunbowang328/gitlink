json.course_members @course_members.each do |member|
  user = member.user
  json.user_login user.login
  json.user_name user.real_name
  json.course_group member.course_group_name
  json.common_score member.common_score
  json.group_score member.group_score
  json.practice_score member.practice_score
  json.exercise_score member.exercise_score
  json.graduation_score member.graduation_score
  json.total_score member.score
  json.rank @rank if @user_course_identity == Course::STUDENT
end
json.all_count @all_count