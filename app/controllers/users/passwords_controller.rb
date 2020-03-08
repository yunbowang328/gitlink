class Users::PasswordsController < Users::BaseAccountController
  def update
    Users::UpdatePasswordService.call(observed_user, update_params)
    render_ok
  rescue Users::UpdatePasswordService::Error => ex
    render_error(ex.message)
  end

  private

  def update_params
    params.permit(:password, :old_password)
  end
end
