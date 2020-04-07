class ForksController < ApplicationController
  before_action :require_login, :find_project_with_id
  before_action :authenticate_project!, :authenticate_user!

  def create
    @new_project = Projects::ForkService.new(current_user, @project, params[:organization]).call
  end

  private
  def authenticate_project!
    return if current_user != @project.owner
    render_result(-1, "自己不能fork自己的项目")
  end

  def authenticate_user!
    return if @project.is_public
    return if @project.member?(current_user) || current_user.admin?
    render_forbidden('你没有权限操作')
  end
end
