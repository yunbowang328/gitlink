class Admins::LaboratoryUsersController < Admins::BaseController
  helper_method :current_laboratory

  def create
    Admins::AddLaboratoryUserService.call(current_laboratory, params.permit(user_ids: []))
    current_laboratory.reload
  end

  def destroy
    @laboratory_user = current_laboratory.laboratory_users.find_by(user_id: params[:user_id])
    @laboratory_user.destroy! if @laboratory_user.present?
  end

  private

  def current_laboratory
    @_current_laboratory ||= Laboratory.find(params[:laboratory_id])
  end
end