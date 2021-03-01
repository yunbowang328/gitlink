json.commit do 
  json.total_count @platform_commit_query[0]
  json.fresh_count @platform_commit_query[1]
end

json.pull_request do 
  json.total_count @platform_pull_request_query[0]
  json.fresh_count @platform_pull_request_query[1]
end