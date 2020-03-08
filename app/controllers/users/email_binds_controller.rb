class Users::EmailBindsController < Users::BaseAccountController
  before_action :private_user_resources!

  def create
    Users::BindEmailService.call(observed_user, create_params)
    render_ok
  rescue Users::BindEmailService::Error => ex
    render_error(ex.message)
  end

  private

  def create_params
    params.permit(:email, :code)
  end
end
