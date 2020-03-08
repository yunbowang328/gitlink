class Weapps::CodeSessionsController < Weapps::BaseController
  def create
    return render_error('code不能为空') if params[:code].blank?

    reset_session
    logged = false

    result = Wechat::Weapp.jscode2session(params[:code])
    Rails.logger.info("###########result: #{result}")
    Rails.logger.info("###########result: #{result['session_key']}")
    Rails.logger.info("###########result: #{result['unionid']}")
    # 能根据 code 拿到 unionid
    open_user = OpenUsers::Wechat.find_by(uid: result['unionid'])
    if open_user.present? && open_user.user
      successful_authentication(open_user.user)
      set_session_unionid(result['unionid'])
      logged = true
    else
      # 根据 code没拿到 unionid
      Rails.logger.info("[Weapp] session_key: #{result['session_key']}")
      Rails.logger.info("[Weapp] code: #{params[:code]}")
      user_info = Wechat::Weapp.decrypt(result['session_key'], params[:encrypted_data], params[:iv])

      # user_info.delete(:nickName)

      # 老用户，已绑定
      open_user = OpenUsers::Wechat.find_by(uid: user_info['unionId'])
      if open_user.present? && open_user.user
        successful_authentication(open_user.user)
        logged = true
      end

      set_session_unionid(user_info['unionId'])
      # user_info['nickname'] = user_info['nickName']
      session[:wechat_user_extra] = user_info
    end

    set_session_openid(result['openid'])
    set_weapp_session_key(result['session_key']) # weapp session_key写入缓存 后续解密需要

    render_ok(openid: result['openid'], logged: logged) unless logged
  rescue Wechat::Error => ex
    render_error(ex.message)
  end
end