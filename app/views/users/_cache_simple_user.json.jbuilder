user = $redis_cache.hgetall("v2-owner-common:#{name}-#{email}")
if user.blank?
  json.id nil
  json.type nil
  json.login name 
  json.name name 
  json.email email
  json.image_url User::Avatar.get_letter_avatar_url(name)
else
  json.id user["id"]
  json.type user["type"]
  json.login user["login"] 
  json.name user["name"] 
  json.email user["email"]
  json.image_url user["avatar_url"]
end