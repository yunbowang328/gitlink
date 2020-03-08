class BindUsersController < ApplicationController
  # before_action :require_login

  def create
    # user = CreateBindUserService.call(create_params)
    #
    if params[:type] == "qq"
      begin
        user = CreateBindUserService.call(current_user, create_params)
        successful_authentication(user) if user.id != current_user.id

        render_ok
      rescue ApplicationService::Error => ex
        render_error(ex.message)
      end
    else
      begin
        tip_exception '系统错误' if session[:unionid].blank?

        bind_user = User.try_to_login(params[:username], params[:password])
        tip_exception '用户名或者密码错误' if bind_user.blank?
        tip_exception '用户名或者密码错误' unless bind_user.check_password?(params[:password].to_s)
        tip_exception '该账号已被绑定，请更换其他账号进行绑定' if bind_user.bind_open_user?(params[:type].to_s)

        OpenUsers::Wechat.create!(user: bind_user, uid: session[:unionid])
        successful_authentication(bind_user)

        render_ok
      rescue Exception => e
        render_error(e.message)
      end
    end
  end

  def new_user
    current_user
  end

  private

  def create_params
    params.permit(:username, :password, :type, :not_bind)
  end
end