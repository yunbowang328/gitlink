json.total_count @total_count
json.projects @projects do |project|
  json.partial! "/projects/project_detail", project: project
end
