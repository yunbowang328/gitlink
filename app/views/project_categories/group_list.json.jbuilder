json.array! @category_group_list do |category,v|
  json.id category[1]
  json.name category[0]
  json.projects_count v
end