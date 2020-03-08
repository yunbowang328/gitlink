json.array! @answers do |answer|
  json.(answer, :id, :name, :contents, :level, :score)
end