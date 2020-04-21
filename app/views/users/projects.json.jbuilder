json.count @total_count
json.projects do
  json.array! @projects do |project|
    user = project.owner
    json.members_count project.members_count
    json.issues_count project.issues_count
    json.changesets_count project&.project_score&.changeset_num.to_i
    json.can_visited project.can_visited?
    json.id project.id
    json.identifier project.identifier
    json.name project.name
    json.is_public project.is_public
    json.owner do
      json.id user.id
      json.real_name user.real_name
      json.avatar_url url_to_avatar(user)
      json.school_name user.school_name
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
