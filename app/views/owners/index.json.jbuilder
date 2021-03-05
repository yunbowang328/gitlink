json.total_count @owners.size
json.owners @owners.each do |owner|
  json.id owner.id
  json.type owner.type
  json.name owner.login
  json.avatar_url url_to_avatar(owner)
end