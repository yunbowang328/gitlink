json.top_scores @top_scores.each do |cm_score|
  user = cm_score.user
  json.user_name user.real_name
  json.user_login user.login
  json.avatar_url url_to_avatar(user)
end