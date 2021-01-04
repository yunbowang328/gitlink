json.total_count @apply_signatures.total_count
json.apply_signatures @apply_signatures do |signature|
  json.id signature.id 
  json.status signature.status

  if signature.user.present?
    json.user do 
      json.partial! 'members/member', user: signature.user
      json.is_owner @project.owner?(signature.user)
    end
  end
end
