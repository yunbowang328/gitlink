class Oauth::EducoderController < Oauth::BaseController
  def bind
    begin
      login = params[:login]
      callback_url = params[:callback_url]
      token = params[:token]

      ::OauthEducoderForm.new({login: login, token: token, callback_url: callback_url}).validate!

      open_user= OpenUsers::Educoder.find_by(uid: login)

      if open_user.present? && open_user.user.present? && open_user.user.email_bind?
        # 存在说明绑定了,验证信息是否齐全,
        if current_user != open_user.user
          logout_user
          successful_authentication(open_user.user)
        end

        redirect_to callback_url
      else
        # 未存在需要进行绑定
        if current_user.blank? || !current_user.logged?
          # forge平台未登录
          redirect_to oauth_register_path(user_id: login, callback_url: callback_url)
        else
          # forge平台已登录
          OpenUsers::Educoder.create!(user: current_user, uid: login)
          redirect_to callback_url
        end
      end
    rescue WechatOauth::Error => ex
      render_error(ex.message)
    end
  end
end
