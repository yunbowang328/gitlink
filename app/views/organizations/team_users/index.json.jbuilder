json.total_count @team_users.total_count
json.team_users @team_users do |team_user|
  json.partial! "detail", team_user: team_user, team: @team, organization: @organization
end
