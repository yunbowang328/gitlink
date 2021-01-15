json.id org_user.id
json.user do
  json.partial! "organizations/user_detail", user: org_user.user
end

json.team_names org_user.teams.pluck(:name)
json.created_at org_user.created_at.strftime("%Y-%m-%d")