class Oauth::BaseController < ActionController::Base
  include RenderHelper
  include LoginHelper
  include ControllerRescueHandler
  # include LaboratoryHelper

  skip_before_action :verify_authenticity_token

  def auth_failure
    render_error(params[:message])
  end

  private

  def session_user_id
    # session[:user_id]
    session[:"#{default_yun_session}"]
  end

  def current_user
    @_current_user ||= User.find_by(id: session_user_id)
  end

  def auth_hash
    Rails.logger.info("[OAuth2] omniauth.auth -> #{request.env['omniauth.auth'].inspect}")
    request.env['omniauth.auth']
  end

  def default_yun_session
    @_default_yun_session = "#{request.subdomain.split('.').first}_user_id"
    # @_default_yun_session = "#{current_laboratory.try(:identifier).split('.').first}_user_id"
  end

  def session_openid
    session[:openid]
  end

  def set_session_openid(openid)
    Rails.logger.info("[wechat] set session openid: #{openid}")
    session[:openid] = openid
  end

  def session_unionid
    session[:unionid]
  end

  def set_session_unionid(unionid)
    Rails.logger.info("[wechat] set session unionid: #{unionid}")
    session[:unionid] = unionid
  end
end
