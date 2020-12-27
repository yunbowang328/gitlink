json.total_count @total_count
json.members @members do |member|
  if member.user.present?
    json.partial! 'member', user: member.user
    json.is_owner @project.owner?(member.user)
    json.role member.roles.last.name
    json.role_name t("roles.#{member.roles.last.name}")
    json.is_apply_signature member.is_apply_signature
  end
end
