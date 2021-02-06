json.total_count @active_developer_rank_query.size
json.developers @active_developer_rank_query.each_with_index.to_a do |item, index|
  user = User.find_by(login: item["develop_name"])
  projects = user.projects
  json.no index + 1
  json.login item["develop_name"]
  json.name user.full_name
  json.develop_projects projects do |project|
    json.(project, :name, :identifier, :description)
  end
  json.total_commit_count item["total_count"]
  json.active_commit_count item["active_count"]
end
