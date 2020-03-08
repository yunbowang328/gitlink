class Oauth::WechatController < Oauth::BaseController
  def create
    # user, new_user = Oauth::CreateOrFindWechatAccountService.call(current_user ,params)

    begin
      code = params['code'].to_s.strip
      tip_exception("code不能为空") if code.blank?
      new_user = false

      result = WechatOauth::Service.access_token(code)
      result = WechatOauth::Service.user_info(result['access_token'], result['openid'])

      # 存在该用户
      open_user = OpenUsers::Wechat.find_by(uid: result['unionid'])
      if open_user.present? && open_user.user.present?
        successful_authentication(open_user.user)
      else
        if current_user.blank? || !current_user.logged?
          new_user = true
          set_session_openid(result['openid'])
          set_session_unionid(result['unionid'])
        else
          OpenUsers::Wechat.create!(user: current_user, uid: result['unionid'])
        end
      end

      render_ok(new_user: new_user)
    rescue WechatOauth::Error => ex
      render_error(ex.message)
    end
  end
end