class Weapps::VerifiesController < Weapps::BaseController
  before_action :require_wechat_login!

  def create
    valid = Wechat::Weapp.verify?(session_openid, params[:verify_string], params[:signature])
    render_ok(valid: valid)
  end
end