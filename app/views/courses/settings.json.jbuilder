json.course_list_id @course.course_list&.id
json.course_list_name @course.course_list&.name
json.name @course.name
json.course_id @course.id
json.school @course.school&.name
json.class_period @course.class_period
json.credit @course.credit
json.start_date @course.start_date
json.end_date @course.end_date
json.is_public @course.is_public
json.course_module_types @course.course_modules.where(hidden: 0).pluck(:module_type)
json.course_modules @course_modules do |module_type|
  json.module_type module_type.module_type
  json.hidden module_type.hidden
  json.module_name module_type.module_name
end
json.authentication @course.authentication
json.professional_certification @course.professional_certification
json.subject_id @course.subject_id
json.excellent @course.excellent