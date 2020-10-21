json.array! @project_statics_list do |static|
  json.project_type static[:project_type]
  json.name static[:name]
  json.projects_count static[:projects_count]
end
