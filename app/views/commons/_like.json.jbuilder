unless @current_user.nil?
  json.liked by_user_liked?(message, @current_user)
end