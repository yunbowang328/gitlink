json.id course.id
json.name course.name
# json.members_count course.members_count
json.members_count course.course_members_count
# json.homework_commons_count course.homework_commons_count
json.homework_commons_count get_tasks_count course
json.attachments_count course.attachments.count
json.visits course.visits
json.school course.school&.name

json.first_category_url module_url(course.course_modules.where(hidden: 0).order(position: :desc).first, course)

json.is_public course.is_public
json.can_visited observed_logged_user? || course.can_visited?

json.teacher do
  json.partial! 'users/shared/real_user', user: course.teacher
end