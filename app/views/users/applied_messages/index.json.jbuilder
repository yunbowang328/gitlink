json.total_count @applied_messages.total_count
json.applied_messages @applied_messages do |message|
  json.partial! "/users/applied_messages/detail", locals: {object: message}
end
