json.total_count @data["records_count"]
json.type %w(notification atme).include?(params[:type]) ? params[:type] : ""
json.unread_notification @data["unread_notification"]
json.unread_atme @data["unread_atme"]
json.messages @data["records"].each do |message|
  json.partial! "message", message: message.stringify_keys
end