json.user do
  json.partial! 'weapps/shared/user', locals: { user: current_user }
end