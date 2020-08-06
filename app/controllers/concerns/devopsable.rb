module Devopsable
  extend ActiveSupport::Concern

  included do
  end

  # devops 权限验证
	def devops_authorize!
		render_forbidden unless @project.owner?(current_user)
	end

	def auto_load_project
		@project = Project.find_by(id: params[:project_id]) || Project.find_by(identifier: params[:project_id])
		render_not_found('未找到相关的项目') if @project.blank?
	end

  # TODO 暂时限制项目拥有者才有权限操作
  def limit_owner_can_devops!(user)
    return if @project.owner? user
    render_forbidden
  end

  def find_cloud_account
    @cloud_account = DevOps::CloudAccount.find params[:id]
  end

  def set_drone_token!(user, cloud_account, drone_token)
    return if user.devops_has_token?
    cloud_account.update_column(:drone_token, drone_token)
    user.set_drone_step!(User::DEVOPS_HAS_TOKEN)
  end
end
