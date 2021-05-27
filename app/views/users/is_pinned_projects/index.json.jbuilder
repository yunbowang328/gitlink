json.total_count @is_pinned_projects.total_count 
json.projects @is_pinned_projects.each do |project|
  json.partial! "projects/project_detail", project: project
end