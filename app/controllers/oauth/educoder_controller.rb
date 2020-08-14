class Oauth::EducoderController < Oauth::BaseController
  def bind
    begin
      login = params[:login]
      callback_url = params[:callback_url]
      oauth_token = params[:key]
      raw_pay_load = params[:raw_pay_load]

      ::OauthEducoderForm.new({login: login, oauth_token: oauth_token, callback_url: callback_url, raw_pay_load: raw_pay_load}).validate!

      open_user= OpenUser::Educoder.find_by(uid: login)

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
