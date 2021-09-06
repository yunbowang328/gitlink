class Projects::ApplyTransferService < ApplicationService
  attr_accessor :owner, :applied_transfer_project
  attr_reader :user, :project, :params 

  def initialize(user, project, params)
    @user   = user
    @project = project
    @params = params
    @owner = Owner.find_by(login: params[:owner_name])
  end

  def call 
    Rails.logger.info("###### Project apply_transfer_service begin ######")
    validate!
    create_apply 
    send_apply_message
    Rails.logger.info("###### Project apply_transfer_service end ######")

    return @applied_transfer_project
  end

  private 
  def validate! 
    raise Error, '仓库标识不正确' if @project.identifier != params[:identifier]
    raise Error, '该仓库正在迁移' if @project.is_transfering
    raise Error, '新拥有者不存在' unless @owner.present?
    raise Error, '新拥有者资料不完善' unless @owner.profile_completed
    raise Error, '新拥有者已经存在同名仓库！' if Project.where(user_id: @owner.id, identifier: params[:identifier]).present?
    raise Error, '未拥有转移权限' unless is_permit_owner
  end

  def is_permit_owner
    return true unless @owner.is_a?(Organization)
    return @owner.is_admin?(@user)
  end

  def create_apply 
    @applied_transfer_project = AppliedTransferProject.create!(user_id: user.id, project_id: project.id, owner_id: @owner.id)
  end

  def send_apply_message 
    SendTransferProjectAppliedMessageJob.perform_now(@applied_transfer_project, @user, 'common')
  end
end