json.projects @projects do |project|
  json.project_id project.id
  json.project_name project.name
end