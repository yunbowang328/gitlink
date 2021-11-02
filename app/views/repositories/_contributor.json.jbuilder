user = $redis_cache.hgetall("v2-owner-common:#{contributor["login"]}-#{contributor["email"]}")
if user.blank?
  json.contributions contributor["contributions"]
  # json.gid contributor["id"]
  json.login contributor["login"]
  json.type nil
  json.name contributor["login"]
  json.image_url User::Avatar.get_letter_avatar_url(contributor["login"])
else
  json.contributions contributor["contributions"]
  # json.gid contributor["id"]
  json.login user["login"]
  json.type user["type"]
  json.name user["name"]
  json.image_url user["avatar_url"]
end
