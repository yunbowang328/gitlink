json.total_count @organization_users.total_count
json.organization_users @organization_users do |org_user|
  json.partial! "detail", org_user: org_user, organization: @organization
end
