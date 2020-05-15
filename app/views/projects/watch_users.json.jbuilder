json.cout @watchers.size 
json.watchers do 
  json.partial! "/projects/list_user", collection: @watchers, as: :target
end