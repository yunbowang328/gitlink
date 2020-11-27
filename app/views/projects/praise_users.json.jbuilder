json.count @praises_count
json.users do 
  json.partial! "/projects/list_user", collection: @praises, as: :target
end