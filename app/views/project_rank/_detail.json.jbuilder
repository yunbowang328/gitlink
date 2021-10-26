project_common = $redis_cache.hgetall("v2-project-common:#{item[0]}")
owner_common = $redis_cache.hgetall("v2-owner-common:#{project_common["owner_id"]}")
json.id item[0]
json.score item[1]
json.name project_common["name"]
json.identifier project_common["identifier"]
json.description project_common["description"]
json.owner do 
  json.id project_common["owner_id"]
  json.name owner_common["name"]
  json.login owner_common["login"]
  json.avatar_url owner_common["avatar_url"]
end
json.visits project_common["visits"]
json.forks project_common["forks"]
json.watchers project_common["watchers"]
json.praises project_common["praises"]
json.issues project_common["issues"]
json.pulls project_common["pullrequests"]