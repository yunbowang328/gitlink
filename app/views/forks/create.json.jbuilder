if @new_project
  json.status 0
  json.message "fork项目成功"
  json.id @new_project.id
  json.identifier @new_project.identifier
else
  json.status -1
  json.message "fork项目失败"
  json.nil!
end
