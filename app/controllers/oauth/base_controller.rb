class Oauth::BaseController < ActionController::Base
  include RenderHelper
  include LoginHelper
  include ControllerRescueHandler
  include LoggerHelper
  # include LaboratoryHelper

  skip_before_action :verify_authenticity_token

  def auth_failure
    render_error(params[:message])
  end

  private
  def tip_exception(status = -1, message)
		raise Educoder::TipException.new(status, message)
  end
  
  def tip_show_exception(status = -2, message)
		raise Educoder::TipException.new(status, message)
  end
  
  def tip_show(exception)
		uid_logger("Tip show status is #{exception.status}, message is #{exception.message}")
		render json: exception.tip_json
	end

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

  def session_edulogin
    session[:edulogin]
  end

  def set_session_edulogin(login)
    Rails.logger.info("[educoder] set sesstion edulogin: #{login}")
    session[:edulogin] = login
  end
end
