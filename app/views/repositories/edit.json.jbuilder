json.project_id @project.id
json.project_name @project.name
json.project_identifier @project.identifier
json.project_description @project.description
json.project_category_id @project.project_category_id
json.project_language_id @project.project_language_id
json.private !@project.is_public
json.project_units @project.project_units.pluck(:unit_type)