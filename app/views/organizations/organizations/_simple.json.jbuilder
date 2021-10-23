if organization.present?
  json.id organization.id
  json.name organization.login
  json.nickname organization.nickname.blank? ? organization.name : organization.nickname
  json.description organization.description
  json.avatar_url url_to_avatar(organization)
else 
  nil
end