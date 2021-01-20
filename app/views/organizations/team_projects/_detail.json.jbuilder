json.id team_project.id
json.project do
  json.owner_name team_project&.project&.owner&.login
  json.name team_project&.project&.name
  json.identifier team_project&.project&.identifier
end