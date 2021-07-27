json.id @webhook.id 
json.(@webhook, :id, :http_method, :content_type, :url, :secret, :last_status, :is_active)
json.type @webhook.hook_task_type
json.create_time Time.at(@webhook.created_unix).strftime("%Y-%m-%d %H:%M:%S")
event = JSON.parse(@webhook.events)
json.branch_filter event["branch_filter"]
if event["send_everything"]
  json.events event["events"].keys
else 
  json.events event["events"].select{|k, v| v}.keys
end
