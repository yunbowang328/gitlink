json.step current_user.devops_step
json.cloud_account do
  if @cloud_account && !current_user.devops_uninit?
    json.ip @cloud_account.drone_ip
    json.redirect_url "#{@cloud_account.drone_url}/login" if current_user.devops_unverified?
  else
    json.nil!
  end
end
