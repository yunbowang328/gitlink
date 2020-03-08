json.status 0
json.message 'success'
json.private_message do
  json.extract! @message, :id, :user_id, :receiver_id, :sender_id, :content

  json.send_day @message.send_time.strftime('%Y-%m-%d')
  json.send_time @message.display_send_time
  json.sender do
    json.partial! 'users/user_simple', user: @message.sender
  end
end