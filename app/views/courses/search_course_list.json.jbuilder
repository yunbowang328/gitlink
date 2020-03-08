json.course_lists @course_lists do |course_list|
  json.id course_list.id
  json.name course_list.name
end
json.search_count @search_count