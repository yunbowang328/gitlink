json.has_course_groups @has_course_groups
json.course_modules do
  json.array! @course_modules do |course_module|
    json.id course_module.id
    json.module_name course_module.module_name
    json.course_second_categories do
      json.array! course_module.course_second_categories, :id, :name
    end
  end
end
