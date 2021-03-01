json.total_count @teams.total_count
json.teams @teams.each do |team|
  json.(team, :id, :name, :authorize)
  json.can_remove !team.includes_all_project && team&.organization&.repo_admin_change_team_access
end