json.total_count @total_count
json.projects @projects do |project|
  user = project.owner
  next if user.blank?

  json.id project.id
  json.identifier project.identifier
  json.name project.name
  json.description Nokogiri::HTML(project.description).text
  json.visits project.visits
  json.praises_count project.praises_count.to_i
  json.forked_count project.forked_count.to_i
  json.is_public project.is_public
  json.mirror_url project.repository&.mirror_url
  json.last_update_time render_unix_time(project.updated_on)
  json.time_ago time_from_now(project.updated_on)
  json.forked_from_project_id project.forked_from_project_id
  json.author do
    json.name user.try(:show_real_name)
    json.login user.login
    json.image_url url_to_avatar(project.owner)
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
end
