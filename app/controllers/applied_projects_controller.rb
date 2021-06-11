class AppliedProjectsController < ApplicationController
  before_action :require_login
  def create 
    @applied_project = Projects::ApplyJoinService.call(current_user, applied_params)
  rescue Projects::ApplyJoinService::Error => ex
    render_error(ex.message)
  end

  private 
  def applied_params 
    params.require(:applied_project).permit(:code, :role)
  end
end