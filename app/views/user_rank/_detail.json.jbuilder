owner_common = $redis_cache.hgetall("v2-owner-common:#{item[0]}")
popular_project = $redis_cache.zrevrange("v2-user-project-rank:#{item[0]}", 0, 1, withscores: true)[0]
popular_project_common = $redis_cache.hgetall("v2-project-common:#{popular_project[0]}")
json.id item[0]
json.score item[1]
json.name owner_common["name"]
json.type owner_common["type"]
json.login owner_common["login"]
json.avatar_url owner_common["avatar_url"]
json.project do 
  json.id popular_project[0]
  json.name popular_project_common["name"]
  json.identifier popular_project_common["identifier"]
  json.description popular_project_common["description"]
end