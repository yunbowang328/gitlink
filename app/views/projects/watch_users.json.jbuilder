json.cout @watch_users.size 
json.watchers do 
  json.partial! "/projects/list_user", collection: @watch_user, as: :target
end