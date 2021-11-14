json.(excellent_project, :id, :title, :url)
project_common = $redis_cache.hgetall("v2-project-common:#{excellent_project&.uuid}")
json.visits (project_common['visits'] || 0).to_i
