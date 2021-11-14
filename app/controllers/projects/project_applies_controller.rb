class Projects::ProjectAppliesController < Projects::BaseController
  before_action :require_profile_completed, only: [:create]
  def create
    project = Projects::ApplyJoinService.call(current_user, create_params)
    render_ok(project_id: project.id)
  rescue Projects::ApplyJoinService::Error => ex
    render_error(ex.message)
  end

  private

  def create_params
    params.permit(:code, :role)
  end
end