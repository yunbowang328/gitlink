json.step @user.devops_step
json.ci_certification @user.ci_certification?
json.cloud_account do
  if @cloud_account && !@user.devops_uninit?
    json.id @cloud_account.id
    json.account @cloud_account.account
    json.ip @cloud_account.drone_ip
    json.secret @cloud_account.visible_secret
    json.authenticate_url @cloud_account.authenticate_url if @user.devops_unverified?
  else
    json.nil!
  end
end
