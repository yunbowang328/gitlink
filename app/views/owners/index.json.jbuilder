json.total_count @owners.size
json.owners @owners.each do |owner|
  json.id owner.id
  json.type owner.type
  json.login owner.login
  json.name owner&.show_real_name
  json.avatar_url url_to_avatar(owner)
end