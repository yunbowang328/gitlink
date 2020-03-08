# 单表存储的信息可以放里面
json.array! users do |user|
  json.username user.full_name
  json.login user.login
  json.user_id user.id
  json.image_url url_to_avatar(user)
end

