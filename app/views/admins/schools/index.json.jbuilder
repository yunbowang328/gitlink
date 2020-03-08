json.count @total_count
json.schools do
  json.array! @schools.each do |school|
    json.extract! school, :id, :name
  end
end