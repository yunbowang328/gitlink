json.array! @category_group_list do |category|
  json.id category.project_category_id
  json.name category.name
  json.projects_count category.projects_count
end
