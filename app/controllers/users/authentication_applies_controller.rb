class Users::AuthenticationAppliesController < Users::BaseAccountController
  before_action :private_user_resources!
  before_action :check_account, only: [:create]

  def create
    Users::ApplyAuthenticationService.call(observed_user, create_params)
    render_ok
  rescue ApplicationService::Error => ex
    render_error(ex.message)
  end

  def destroy
    return render_error('已认证后不能撤销') if observed_user.authentication?
    observed_user.process_real_name_apply&.revoke!
    render_ok
  end

  private

  def create_params
    params.permit(:name, :show_realname, :gender, :id_number, :upload_image, attachment_ids: [])
  end
end