json.total_count @teams.total_count
json.teams @teams.each do |team|
  json.(team, :id, :name, :authorize)
end