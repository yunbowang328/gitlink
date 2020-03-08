json.count @users.total_count
json.users do
  json.array! @users.each do |user|
    json.extract! user, :id, :login, :real_name, :identity, :school_name, :hidden_phone
  end
end