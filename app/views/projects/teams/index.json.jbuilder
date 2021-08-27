json.total_count @teams.total_count
json.can_add @owner.is_owner?(current_user.id) || @owner&.repo_admin_change_team_access
json.teams @teams.each do |team|
  json.(team, :id, :name, :authorize)
  json.can_remove !team.includes_all_project && (@owner.is_owner?(current_user.id) || team&.organization&.repo_admin_change_team_access)
end