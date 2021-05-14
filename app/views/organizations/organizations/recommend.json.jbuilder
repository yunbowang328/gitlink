json.organizations @organizations do |organization|
  json.id organization.id
  json.name organization.login
  json.nickname organization.nickname.blank? ? organization.name : organization.nickname
  json.avatar_url url_to_avatar(organization)
end