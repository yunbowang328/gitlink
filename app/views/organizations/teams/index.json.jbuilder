json.total_count @teams.total_count
json.teams @teams do |team|
  json.partial! "detail", team: team, organization: @organization
end
