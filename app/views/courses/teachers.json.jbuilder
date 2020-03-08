json.teacher_list do
  json.array! @teacher_list do |teacher|
    json.course_member_id teacher.id
    json.name teacher.user.real_name
    json.name_link user_path(teacher.user)
    json.login teacher.user.login
    json.user_id teacher.user.id
    json.role teacher.role == "CREATOR" ? "管理员" : teacher.role == "PROFESSOR" ? "教师" : "助教"
    json.course_groups do
      if @course.course_groups_count > 0
        json.array! @course.course_groups.select{|group| teacher.teacher_course_groups.pluck(:course_group_id).include?(group.id)} do |course_group|
          json.name course_group.name
          json.id course_group.id
        end
      end
    end
    json.graduation_group teacher.graduation_group.try(:name)
    json.graduation_group_id teacher.graduation_group.try(:id)
    if @user_course_identity < Course::ASSISTANT_PROFESSOR
      json.member_roles teacher.user.course_role(@course)
    end
  end
end
json.teacher_list_size @teacher_list_size
json.apply_size @applications_size
json.is_admin @is_admin