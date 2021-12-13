project_common = $redis_cache.hgetall("v2-project-common:#{item[0]}")
owner_common = $redis_cache.hgetall("v2-owner-common:#{project_common["owner_id"]}")
json.id item[0]
json.score item[1]
json.name project_common["name"]
if project_common['identifier'].include?("/")
  json.identifier project_common["identifier"].split('/')[1]
  json.owner do 
    json.id nil
    json.type 'User'
    json.name project_common["identifier"].split('/')[0]
    json.login project_common["identifier"].split('/')[0]
    json.avatar_url User::Avatar.get_letter_avatar_url(project_common["identifier"].split('/')[0])
  end
else
  json.identifier project_common["identifier"]
  json.owner do 
    json.id project_common["owner_id"]
    json.type owner_common["type"]
    json.name owner_common["name"]
    json.login owner_common["login"]
    json.avatar_url owner_common["avatar_url"]
  end
end
json.description project_common["description"]
json.visits project_common["visits"]
json.forks project_common["forks"]
json.watchers project_common["watchers"]
json.praises project_common["praises"]
json.issues project_common["issues"]
json.pulls project_common["pullrequests"]