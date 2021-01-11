json.organizations @organizations do |organization|
  json.partial! "detail", organization: organization
end
