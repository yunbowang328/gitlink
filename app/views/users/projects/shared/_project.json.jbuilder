json.id project.id
json.name project.name

json.members_count project.members.count
json.issues_count project.issues.count
json.changesets_count project.project_score&.changeset_num.to_i

json.is_public project.is_public?
json.can_visited project.can_visited?

json.owner do
  json.partial! 'users/shared/real_user', user: project.owner
end