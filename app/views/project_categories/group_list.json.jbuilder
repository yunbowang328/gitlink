json.array! @category_group_list do |category,v|
  json.id category[0]
  json.name category[1]
  json.projects_count v
end