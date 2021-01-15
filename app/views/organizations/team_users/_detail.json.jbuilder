json.id team_user.id
json.user do
  json.partial! "organizations/user_detail", user: team_user.user
end
json.created_at team_user.created_at.strftime("%Y-%m-%d")