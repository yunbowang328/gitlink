class Projects::AppliedTransferProjectsController < Projects::BaseController
  before_action :check_auth
  before_action :check_user_profile_completed

  def organizations 
    @organizations = Organization.includes(:organization_extension).joins(team_users: :team).where(team_users: {user_id: current_user.id}, teams: {authorize: %w(admin owner)})
  end

  def create 
    @applied_transfer_project = Projects::ApplyTransferService.call(current_user, @project, params)
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  def cancel 
    @applied_transfer_project = Projects::CancelTransferService.call(current_user, @project)
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  private 
  def check_auth 
    return render_forbidden unless current_user.admin? ||@project.owner?(current_user)
  end

  def check_user_profile_completed
    @owner = Owner.find_by(login: params[:owner_name])
    return if @owner.is_a?(Organization)
    require_user_profile_completed(@owner)
  end
end