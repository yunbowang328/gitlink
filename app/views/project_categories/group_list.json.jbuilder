json.array! @project_categories do |category|
  hidden_projects = category.projects.joins(:license).where(is_public: false, licenses: {is_secret: false})
  json.id category.id
  json.name category.name
  json.projects_count category.projects_count - hidden_projects.size
end
