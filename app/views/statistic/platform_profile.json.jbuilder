json.user do 
  json.total_count @platform_user_query[0]
  json.active_count @platform_user_query[1]
  json.fresh_count @platform_user_query[2]
end

json.project do 
  json.total_count @platform_project_query[0]
  json.active_count @platform_project_query[1]
  json.fresh_count @platform_project_query[2]
end

json.course do 
  json.total_count @platform_course_query[0]
  json.active_count @platform_course_query[1]
  json.fresh_count @platform_course_query[2]
end