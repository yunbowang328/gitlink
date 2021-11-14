json.(webhook, :id, :url, :http_method, :is_active)
json.type webhook.hook_task_type
json.last_status webhook.last_status
json.create_time Time.at(webhook.created_unix).strftime("%Y-%m-%d %H:%M:%S")