json.author do
  if @project.forge?
    json.login user.login
    json.type user&.type
    json.name user.real_name
    json.image_url url_to_avatar(user)
  else
    json.login @project.project_educoder&.repo_name&.split('/')[0]
    json.name @project.project_educoder&.owner
    json.type 'Educoder'
    json.image_url @project.project_educoder&.image_url
  end
end
