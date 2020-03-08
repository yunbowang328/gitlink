json.carousels do
  json.array! @carousels do |carousel|
    json.extract! carousel, :id, :link, :position

    json.path carousel.link
    json.image_url Util::FileManage.source_disk_file_url(carousel)
  end
end

if @advert.present?
  json.advert do
    json.extract! @advert, :id, :link
    json.image_url Util::FileManage.source_disk_file_url(@advert)
  end
else
  json.advert nil
end

json.course_count @course_count
json.courses @courses.each do |course|
  json.(course, :id, :name, :visits, :course_members_count, :is_end, :invite_code_halt)
  json.creator course.teacher.real_name
  json.avatar_url url_to_avatar(course.teacher)
  json.invite_code course.invite_code_halt == 0 ? course.generate_invite_code : ""
  json.school course.school&.name
  course_member = @category == "study" ? course.students.where(user_id: @user.id).first : course.teachers.where(user_id: @user.id).first
  json.sticky course_member.sticky
  json.course_identity current_user.course_identity(course)
end

