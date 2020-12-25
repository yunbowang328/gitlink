# json.array! @category_group_list do |category,v|
#   json.id category[0]
#   json.name category[1]
#   json.projects_count v
# end

json.array! @category_group_list do |k,v|
  children_category =  @project_children_categories.get_children(v)
  json.children do
    json.array! children_category do |cate|
      json.id cate[0]
      json.name cate[1]
      json.parent_id v
    end
  end
  json.id v
  json.name k.to_s
end
