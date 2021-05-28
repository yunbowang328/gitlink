json.total_contributions @headmaps.collect{|map| map["contributions"]}.reduce(0, :+)
json.headmaps @headmaps.each do |map|
  json.date Time.at(map["timestamp"].to_i).strftime("%Y-%m-%d")
  json.contributions map["contributions"]
end
