json.total_count @organizations.size
json.organizations @organizations do |org|
  json.partial! "/organizations/organizations/simple", locals: {organization: org}
end
