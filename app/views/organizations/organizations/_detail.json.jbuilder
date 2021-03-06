json.id organization.id
json.name organization.login
json.nickname organization.nickname.blank? ? organization.name : organization.nickname
json.description organization.description
json.website organization.website
json.location organization.location
json.repo_admin_change_team_access organization.repo_admin_change_team_access
json.visibility organization.visibility
json.max_repo_creation organization.max_repo_creation
json.num_projects organization.num_projects
json.num_users organization.num_users
json.num_teams organization.num_teams
json.avatar_url url_to_avatar(organization)
json.created_at organization.created_on.strftime("%Y-%m-%d")