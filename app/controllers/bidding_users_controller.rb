class BiddingUsersController < ApplicationController
  before_action :require_login, :check_auth

  def create
    ProjectPackages::BiddingService.call(current_package, current_user)
    render_ok
  rescue ProjectPackages::BiddingService::Error => ex
    render_error(ex.message)
  end

  def win
    ProjectPackages::WinBiddingService.call(current_package, current_user, params)
    render_ok
  rescue ProjectPackages::WinBiddingService::Error => ex
    render_error(ex.message)
  end

  private

  def current_package
    @_current_package ||= ProjectPackage.find(params[:project_package_id])
  end
end