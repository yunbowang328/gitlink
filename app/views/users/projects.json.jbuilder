json.count @total_count
json.projects do
  json.array! @projects do |project|
    json.partial! "/projects/project_detail", project: project
  end
end
