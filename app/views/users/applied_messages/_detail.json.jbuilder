# project = object.project
# json.project do 
#   json.id project.id
#   json.identifier project.identifier
#   json.name project.name
#   json.description project.description
#   json.is_public project.is_public
#   json.owner do 
#     json.partial! "/users/user_simple", locals: {user: project.owner}
#   end
# end
# json.user do 
#   json.partial! "/users/user_simple", locals: {user: object.user}
# end
json.applied do 
  json.partial! "/projects/applied_transfer_projects/detail", locals: {object: object.applied}
end
json.applied_user do 
  json.partial! "/users/user_simple", locals: {user: object.applied_user}
end
json.applied_type object.applied_type
json.name object.name
json.viewed object.viewed
json.status object.status
json.created_at format_time(object.created_at)
json.time_ago time_from_now(object.created_at)
