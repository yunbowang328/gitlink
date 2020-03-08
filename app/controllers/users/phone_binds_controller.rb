class Users::PhoneBindsController < Users::BaseAccountController
  before_action :private_user_resources!

  def create
    Users::BindPhoneService.call(observed_user, create_params)
    render_ok
  rescue Users::BindPhoneService::Error => ex
    render_error(ex.message)
  end

  private

  def create_params
    params.permit(:phone, :code)
  end
end
