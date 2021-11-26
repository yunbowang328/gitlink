project = object.project
if project.present?
  json.project do 
    json.id project.id
    json.identifier project.identifier
    json.name project.name
    json.description project.description
    json.is_public project.is_public
    json.owner do 
      json.partial! "/users/user_simple", locals: {user: project.owner}
    end
  end
else
  json.project nil 
end
json.user do 
  json.partial! "/users/user_simple", locals: {user: object.user}
end
json.owner do 
  json.partial! "/users/user_simple", locals: {user: object.owner}
end
json.id object.id
json.status object.status
json.created_at format_time(object.created_at)
json.time_ago time_from_now(object.created_at)
