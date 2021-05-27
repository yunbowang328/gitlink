json.total_count @project_trends.total_count 
json.project_trends @project_trends.each do |trend| 
  json.partial! "project_trends/detail", trend: trend
end