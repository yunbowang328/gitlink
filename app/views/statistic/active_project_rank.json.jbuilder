json.total_count @active_project_rank_query.size
json.projects @active_project_rank_query.each_with_index.to_a do |item, index|
  project = Project.find_by(identifier: item["name"])
  json.no index + 1
  json.identifier item["name"]
  json.name project.name
  json.total_commit_count item["total_count"]
  json.active_commit_count item["active_count"]
  json.member_count project.members.size
end