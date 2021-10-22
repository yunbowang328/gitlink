json.id @webhook.id 
json.(@webhook, :id, :http_method, :content_type, :url, :secret, :last_status, :is_active)
json.type @webhook.hook_task_type
json.create_time Time.at(@webhook.created_unix).strftime("%Y-%m-%d %H:%M:%S")
event = @webhook.events
json.branch_filter event["branch_filter"]
if event["send_everything"]
  json.events event["events"].keys.collect{|i| i == "pull_request" ?  i + "_only" : i}
else 
  json.events event["events"].select{|k, v| v}.keys.collect{|i| i == "pull_request" ?  i + "_only" : i}
end
