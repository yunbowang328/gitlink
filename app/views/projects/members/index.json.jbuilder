json.total_count @users.total_count
json.users do
  json.partial! 'users/user_small', users: @users
end
