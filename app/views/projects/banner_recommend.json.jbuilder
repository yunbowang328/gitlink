json.partial! "commons/success"
json.projects do 
  json.array! @projects do |project|
    owner = project.owner
    json.id project.id
    json.identifier project.identifier
    json.name project.name
    json.visits project.visits
    json.author do
      json.name owner.try(:show_real_name)
      json.type owner.type
      json.login owner.login
      json.image_url url_to_avatar(owner)
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

