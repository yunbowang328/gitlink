class Weapps::BaseController < ApplicationController

  private

  def require_wechat_login!
    Rails.logger.info("[Weapp] unionid: #{session_unionid}, openid: #{session_openid}")
    return if session_unionid.present?

    render_error('请先进行微信授权')
  end

  def weapp_session_key
    Wechat::Weapp.session_key(session_openid)
  end

  def set_weapp_session_key(session_key)
    Wechat::Weapp.write_session_key(session_openid, session_key)
  end

  def session_openid
    session[:openid]
  end

  def set_session_openid(openid)
    Rails.logger.info("[Weapp] set session openid: #{openid}")
    session[:openid] = openid
  end

  def session_unionid
    session[:unionid]
  end

  def set_session_unionid(unionid)
    Rails.logger.info("[Weapp] set session unionid: #{unionid}")
    session[:unionid] = unionid
  end
end