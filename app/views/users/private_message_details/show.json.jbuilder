json.count @count
json.target do
  json.partial! 'users/user_simple', user: target_user
end
json.messages do
  json.array! @messages.each do |message|
    json.extract! message, :id, :user_id, :receiver_id, :sender_id, :content

    json.send_time message.display_send_time
    json.send_day message.send_time.strftime('%Y-%m-%d')
    json.sender do
      json.partial! 'users/user_simple', user: message.sender
    end
  end
end