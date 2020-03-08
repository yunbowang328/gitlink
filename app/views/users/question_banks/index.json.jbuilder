
json.count @count
json.course_list @course_lists do |course_list|
  json.id course_list.id
  json.name course_list.name
end
