json.course_groups @course_groups.each do |group|
  json.(group, :id, :course_members_count, :name, :invite_code_halt)
  json.invite_code group.invite_code if @user_course_identity < Course::STUDENT
  json.member_manager member_manager(group, @teachers) if @user_course_identity < Course::NORMAL
  json.edit_auth edit_auth(group, @teachers) if @user_course_identity < Course::STUDENT
end

if @user_course_identity == Course::STUDENT
  json.current_group_id @current_group_id
end
json.none_group_member_count @course.none_group_count
json.group_count @all_group_count