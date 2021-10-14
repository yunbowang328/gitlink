json.type type
json.type_name type.constantize.type_name
json.total_settings_count count
json.settings do
  json.array! type.constantize.openning.limit(100).each do |setting|
    json.(setting, :name, :key, :notification_disabled, :email_disabled)
  end
end