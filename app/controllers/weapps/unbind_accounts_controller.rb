class Weapps::UnbindAccountsController < Weapps::BaseController
  before_action :require_login

  def show
    @user = current_user
  end

  def destroy
    open_user = OpenUsers::Wechat.find_by!(user_id: current_user.id)
    session[:unionid] = open_user.uid
    open_user.destroy!
    UserAction.create(action_id: current_user.id, action_type: "UnbindWechat", user_id: current_user.id, :ip => request.remote_ip)
    logout_user
    render_ok
  end
end