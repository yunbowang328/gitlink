json.total_count @total_count
json.projects do
  json.array! @projects.to_a do |project|
    json.partial! 'project', project: project
    json.author do
      json.name project.owner.try(:show_real_name)
      json.login project.owner.login
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
end
