json.partial! "detail", organization: @organization
json.can_create_project @can_create_project
json.is_admin @is_admin
json.is_member @is_member