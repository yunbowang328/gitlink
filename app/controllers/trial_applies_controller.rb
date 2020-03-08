class TrialAppliesController < ApplicationController
  before_action :require_user_login

  def create
    Users::ApplyTrailService.call(current_user, create_params)
    render_ok
  rescue Users::ApplyTrailService::Error => ex
    render_error(ex.message)
  end

  private

  def create_params
    params.permit(:phone, :code, :reason).merge(remote_ip: request.remote_ip)
  end

  def require_user_login
    return if User.current.logged?

    render_unauthorized
  end
end
