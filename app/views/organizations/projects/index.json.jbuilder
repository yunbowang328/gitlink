json.total_count @projects.total_count
json.projects @projects.each do |project|
  json.(project, :name, :identifier, :description, :forked_count, :praises_count)
  json.praised project.praised_by?(current_user)
  json.last_update_time render_unix_time(project.updated_on)
  json.time_ago time_from_now(project.updated_on)
end