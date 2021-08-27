json.total_count @tasks.total_count 
json.tasks @tasks.each do |task|
  json.(task, :id, :type, :uuid, :is_succeed, :is_delivered, :payload_content, :request_content, :response_content)
  json.delivered_time Time.at(task.delivered*10**-9).strftime("%Y-%m-%d %H:%M:%S")
end