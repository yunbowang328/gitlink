json.id project.id
json.repo_id project&.repository&.id
json.identifier render_identifier(project)
json.name project.name
json.description Nokogiri::HTML(project.description).text
json.visits project.visits
json.praises_count project.praises_count.to_i
json.watchers_count project.watchers_count.to_i 
json.issues_count project.issues_count.to_i  
json.pull_requests_count project.pull_requests_count.to_i  
json.forked_count project.forked_count.to_i
json.is_public project.is_public
json.mirror_url project.repository&.mirror_url
json.type project&.numerical_for_project_type
json.last_update_time render_unix_time(project.updated_on)
json.time_ago time_from_now(project.updated_on)
json.forked_from_project_id project.forked_from_project_id
json.open_devops project.open_devops?
json.platform project.platform
json.is_pinned project.has_pinned_users.include?(current_user)
json.author do
  if project.educoder?
    project_educoder = project.project_educoder
    json.name project_educoder&.owner
    json.type 'Educoder'
    json.login project_educoder&.repo_name.split('/')[0]
    json.image_url render_educoder_avatar_url(project.project_educoder)
  else
    user = project.owner
    json.name user.try(:show_real_name)
    json.type user&.type
    json.login user.login
    json.image_url url_to_avatar(user)
  end
end

json.category do
  if project.project_category.blank?
    json.nil!
  else
    json.id project.project_category.id
    json.name project.project_category.name
  end
end
json.language do
  if project.project_language.blank?
    json.nil!
  else
    json.id project.project_language.id
    json.name project.project_language.name
  end
end
