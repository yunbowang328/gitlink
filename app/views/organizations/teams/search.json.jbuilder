json.total_count @teams.size
json.teams @teams do |team|
  json.partial! "detail", team: team, organization: @organization
end
