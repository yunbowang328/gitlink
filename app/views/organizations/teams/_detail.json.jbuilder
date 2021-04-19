json.id team.id
json.name team.name
json.nickname team.nickname.blank? ? team.name : team.nickname
json.description team.description
json.authorize team.authorize
json.includes_all_project team.includes_all_project
json.can_create_org_project team.can_create_org_project
json.num_projects team.num_projects
json.num_users team.num_users
json.units team.team_units.pluck(:unit_type)
json.users team.team_users.each do |user|
  json.partial! "organizations/user_detail", user: user&.user
end
json.is_admin @is_admin
json.is_member  team.is_member?(current_user.id)
