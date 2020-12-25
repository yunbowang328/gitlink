json.name @project.name
json.identifier @project.identifier
json.is_public @project.is_public
json.is_secret @project.is_secret
json.description @project.description
json.repo_id @project.repository.id
json.repo_identifier @project.repository.identifier
user_apply_signatures = @project.apply_signatures.with_user_id(current_user.id)
json.user_apply_signatures user_apply_signatures do |signature|
  json.id signature.id
  json.status signature.status
end