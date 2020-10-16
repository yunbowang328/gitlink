json.step current_user.devops_step
json.cloud_account do
  if @cloud_account && !current_user.devops_uninit?
    json.ip @cloud_account.drone_ip
  else
    json.nil!
  end
end
