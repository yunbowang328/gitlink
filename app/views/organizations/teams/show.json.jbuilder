json.partial! "detail", team: @team, organization: @organization
json.is_admin @is_admin
json.is_member @is_member
json.organization do 
  json.partial! "organizations/organizations/simple", organization: @organization
end