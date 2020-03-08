json.total_count @total_count
json.users do
  json.partial! 'user_small', users: @users
end
