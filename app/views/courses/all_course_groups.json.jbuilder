json.course_groups do
  json.array! @course_groups_array do |course_group|
    json.id course_group.id
    json.name course_group.name
  end
end
json.course_groups_count @course_groups_array.size