json.array! @project_categories do |category|
  json.id category.id
  json.name category.name
  # json.projects_count category.projects_count
  json.projects_count category.projects.size
end
