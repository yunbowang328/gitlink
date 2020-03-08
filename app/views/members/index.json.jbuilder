json.total_count @total_count
json.members @members do |member|
  json.partial! 'member', user: member.user
  json.is_owner @project.owner?(member.user)
  json.role member.roles.last.name
end
