json.total_count @organizations.total_count
json.organizations @organizations do |organization|
  json.partial! "/organizations/organizations/detail", organization: organization
end
