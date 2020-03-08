if @new_project
  json.id @new_project.id
  json.identifier @new_project.identifier
else
  json.nil!
end
