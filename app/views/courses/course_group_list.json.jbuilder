json.course_groups do
  json.array! @all_course_groups do |course_group|
    json.id course_group.id
    json.name course_group.name
    json.checked @existed_course_group_ids.include? course_group.id
  end
end