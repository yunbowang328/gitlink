json.user do 
  json.partial! 'users/user_simple', locals: { user: setting.user }
end
json.notification_body setting.notification_body
json.email_body setting.email_body