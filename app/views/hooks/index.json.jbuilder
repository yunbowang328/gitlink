json.count @hooks_size 
json.hooks do 
  json.array! @hooks.each do |h| 
    json.merge! h
  end
end