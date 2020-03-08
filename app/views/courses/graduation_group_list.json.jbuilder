json.graduation_group_list do
  json.array! @graduation_group_list do |graduation_group|
    json.id graduation_group.id
    json.name graduation_group.name
  end
end
json.graduation_groups_count @graduation_group_list.size