json.total_projects_count @full_member_projects_count
json.role do
  json.owner do 
    json.count @owner_projects_count
    json.percent (@owner_projects_count.to_f/@full_member_projects_count).round(2)
  end
  json.manager do 
    json.count @manager_projects_count
    json.percent (@manager_projects_count.to_f/@full_member_projects_count).round(2)
  end
  json.developer do 
    json.count @developer_projects_count
    json.percent (@developer_projects_count.to_f/@full_member_projects_count).round(2)
  end
  json.reporter do 
    json.count @reporter_projects_count
    json.percent (@reporter_projects_count.to_f/@full_member_projects_count).round(2)
  end
end