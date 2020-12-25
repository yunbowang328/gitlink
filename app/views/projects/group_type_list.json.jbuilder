# json.array! @project_group_list do |type,v|
#   json.project_type type
#   json.name render_zh_project_type(type)
#   json.projects_count v
# end

json.array! @project_group_list do |k,v|
  json.name k
  json.id v
end
