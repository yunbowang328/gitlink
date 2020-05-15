json.count @fork_users.size 
json.fork_users do 
  json.array! @fork_users.each do |f|
    user = f.user 
    fork_project = Project.select(:id,).find_by(f.fork_project_id)
    json.id f.fork_project_id
    json.name "#{user.try(:show_real_name)}/#{fork_project.name}"
    json.login user.try(:login)
    json.image_url url_to_avatar(user)
    json.format_time f.created_at.strftime("%Y-%m-%d")
  end
end