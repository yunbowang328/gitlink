json.total_count @team_projects.total_count
json.team_projects @team_projects do |team_project|
  json.partial! "detail", team_project: team_project, team: @team, organization: @organization
end
