json.count @praises.size
json.praises do 
  json.partial! "/projects/list_user", collection: @praises, as: :target
end