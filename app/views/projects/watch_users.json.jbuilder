json.count @watchers_count
json.users do 
  json.partial! "/projects/list_user", collection: @watchers, as: :target
end