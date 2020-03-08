json.count @count
json.private_messages do
  json.array! @messages.each do |message|
    json.extract! message, :id, :content, :message_count

    json.unread message.unread?
    json.send_time message.display_send_time

    json.target do
      json.partial! 'users/user_simple', user: message.target
    end
  end
end