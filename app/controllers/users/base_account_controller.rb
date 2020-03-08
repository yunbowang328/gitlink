class Users::BaseAccountController < Users::BaseController
  before_action :require_login

  def observed_user
    @_observed_user ||= (User.find_by_id(params[:account_id]) || User.find_by_login(params[:account_id]))
  end

end
