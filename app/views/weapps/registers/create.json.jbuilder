json.status 0
json.user do
  json.partial! 'weapps/shared/user', locals: { user: @user }
end