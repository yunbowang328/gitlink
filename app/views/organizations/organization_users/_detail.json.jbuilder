json.id org_user.id
json.user do
  json.partial! "/users/user", user: org_user.user
end

json.team_names org_user.teams.pluck(:name)