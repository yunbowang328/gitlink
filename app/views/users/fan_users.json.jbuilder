json.count @watchers_count
json.users do 
  json.partial! "/users/watch_user_detail", collection: @watchers, as: :target
end