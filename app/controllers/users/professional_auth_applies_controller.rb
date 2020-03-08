class Users::ProfessionalAuthAppliesController < Users::BaseAccountController
  before_action :private_user_resources!
  before_action :check_account, only: [:create]

  def create
    Users::ApplyProfessionalAuthService.call(observed_user, create_params)
    render_ok
  rescue Users::ApplyProfessionalAuthService::Error => ex
    render_error(ex.message)
  end

  def destroy
    return render_error('已认证后不能撤销') if observed_user.professional_certification?
    observed_user.process_professional_apply&.revoke!
    render_ok
  end

  private

  def create_params
    params.permit(:school_id, :department_id, :identity, :extra, :upload_image, attachment_ids: [])
  end
end