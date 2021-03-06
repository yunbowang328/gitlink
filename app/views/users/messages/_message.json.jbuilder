json.id message["id"]
# json.receiver do 
#   json.partial! '/users/user_simple', locals: {user: current_user}
# end
json.status message["status"]
json.content message["content"]
json.notification_url message["notification_url"]
json.source message["source"]
json.time_ago time_from_now(message["created_at"].to_time)

case message["type"]
when 1
  json.type "notification"
when 2
  json.type "atme" 
  json.sender do 
    sender = $redis_cache.hgetall("v2-owner-common:#{message["sender"]}") 
    if sender.blank?
      sender = User.find_by_id(message["sender"]) || User.find_by_id(JSON.parse(message['extra'])['operator_id'])
      if sender.present?
        json.partial! '/users/user_simple', locals: {user: sender}
      else 
        json.nil
      end
    else
      json.id message["sender"]
      json.type sender['type']
      json.name sender['name']
      json.login sender['login']
      json.image_url sender['avatar_url']
    end
  end
end
