json.id team_user.id
json.user do
  json.partial! "/users/user", user: team_user.user
end