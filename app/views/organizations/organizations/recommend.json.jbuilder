json.organizations do

  json.array! @organizations.each do |group|
    json.array! group.each do |organization|
      json.id organization.id
      json.name organization.login
      json.nickname organization.real_name
      json.avatar_url url_to_avatar(organization)
      json.website organization.website
    end
  end
end