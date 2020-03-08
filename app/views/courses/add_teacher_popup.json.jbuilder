json.school_name @school_name
json.graduation_groups do
  json.array! @graduation_groups do |graduation_group|
    json.id graduation_group.id
    json.name graduation_group.name
  end
end
json.course_groups do
  json.array! @course_groups do |course_group|
    json.id course_group.id
    json.name course_group.name
  end
end