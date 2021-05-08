json.project_id @project.id
json.project_name @project.name
json.project_identifier @project.identifier
json.project_description @project.description
json.project_category_id @project.project_category_id
json.project_language_id @project.project_language_id
json.private !@project.is_public
json.website @project.website
json.project_units @project.project_units.pluck(:unit_type)
json.lesson_url @project.lesson_url
json.permission render_permission(current_user, @project)
json.is_transfering @project.is_transfering
json.transfer do 
  json.partial! "/users/user_simple", locals: {user: @project&.applied_transfer_project&.owner}
end