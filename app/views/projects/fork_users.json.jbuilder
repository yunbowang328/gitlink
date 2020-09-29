json.count @forks_count
json.users do
  json.array! @fork_users.each do |f|
    user = f.user
    json.id f.fork_project.id
    json.identifier f.fork_project.identifier
    json.name "#{user.try(:show_real_name)}/#{f.fork_project.try(:name)}"
    json.login user.try(:login)
    json.image_url url_to_avatar(user)
    json.format_time f.created_at.strftime("%Y-%m-%d")
  end
end
