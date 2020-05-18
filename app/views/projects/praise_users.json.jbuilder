json.count @praises_count
json.praises do 
  json.partial! "/projects/list_user", collection: @praises, as: :target
end