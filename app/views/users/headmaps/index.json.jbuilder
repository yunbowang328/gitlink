json.total_contributions @headmaps.collect{|map| map["contributions"]}.reduce(0, :+)
json.headmaps @headmaps.each do |map|
  json.date map["timestamp"]
  json.contributions map["contributions"]
end
