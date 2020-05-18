json.count @watchers_count
json.watchers do 
  json.partial! "/projects/list_user", collection: @watchers, as: :target
end