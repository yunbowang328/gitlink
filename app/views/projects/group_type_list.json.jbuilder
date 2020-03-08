json.array! @project_group_list do |group|
  json.project_type group.project_type
  json.name render_zh_project_type(group.project_type)
  json.projects_count group.projects_count
end
