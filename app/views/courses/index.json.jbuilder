json.courses @courses do |course|
    json.id course.id
    json.name course.name
    json.avatar_url url_to_avatar(course.teacher)
    json.creator course.teacher.real_name
    json.school course.school&.name
    json.technical_title "" # course.teacher.identity
    json.course_members_count course.course_members_count
    json.tasks_count get_tasks_count course
    json.visits course.visits
    json.is_public course.is_public
    json.is_accessible course.is_public == 1 || @user.course_identity(course) < Course::NORMAL
    json.is_end course.is_end
    json.first_category_url module_url(course.none_hidden_course_modules.first, course)
    json.excellent course.excellent
end
json.courses_count @courses_count
