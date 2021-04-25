class Projects::ApplyTransferService < ApplicationService
  attr_accessor :owner, :applied_transfer_project
  attr_reader :user, :project, :owner_id 

  def initialize(user, project, owner_id)
    @user   = user
    @project = project
    @owner_id = owner_id
    @owner = Owner.find_by_id(owner_id)
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
    raise Error, '该仓库正在迁移' if @project.is_transfering
    raise Error, '新拥有者不存在' unless @owner.present?
    raise Error, '未拥有转移权限' unless is_permit_owner
  end

  def is_permit_owner
    return true unless @owner.is_a?(Organization)
    return @owner.is_owner?(@user)
  end

  def create_apply 
    @applied_transfer_project = AppliedTransferProject.create!(user_id: user.id, project_id: project.id, owner_id: owner_id)
  end

  def send_apply_message 
    SendTransferProjectAppliedMessageJob.perform_now(@applied_transfer_project, @user, 'common')
  end
end