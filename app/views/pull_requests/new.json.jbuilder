json.partial! "commons/success"
json.project_id @project.identifier
json.branches @all_branches
json.is_fork @is_fork
json.projects_names @projects_names
json.merge_projects @merge_projects
# json.merge_branches @merge_branches