class ForksController < ApplicationController
  before_action :require_login
  before_action :load_project
  before_action :authenticate_project!, :authenticate_user!
  skip_after_action :user_trace_log, only: [:create]

  def create
    @new_project = Projects::ForkService.new(current_user, @project, params[:organization]).call
    user = current_user
    Rails.logger.user_trace.info("{id: #{user.id}, login: #{user.login}, url: #{request.url}, method: #{request.method}, params: #{params.merge(forkee: @new_project.id)}, response_code: #{response.code}, time: #{Time.now}}")
  end

  private
  def authenticate_project!
    if current_user&.id == @project.user_id
      render_result(-1, "自己不能fork自己的项目")
    elsif Project.exists?(user_id: current_user.id, identifier: @project.identifier)
      render_result(-1, "fork失败，你已拥有了这个项目")
    end
    # return if current_user != @project.owner
    # render_result(-1, "自己不能fork自己的项目")
  end

  def authenticate_user!
    return if @project.is_public
    return if @project.member?(current_user) || current_user.admin?
    render_forbidden('你没有权限操作')
  end
end
