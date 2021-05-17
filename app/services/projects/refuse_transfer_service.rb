class Projects::RefuseTransferService < ApplicationService
  attr_accessor :applied_transfer_project, :owner
  attr_reader :user, :project 

  def initialize(user, project)
    @user   = user
    @project = project
    @applied_transfer_project = project.applied_transfer_project
    @owner = @applied_transfer_project.owner
  end

  def call 
    Rails.logger.info("###### Project refuse_transfer_service begin ######")
    validate!
    update_apply 
    send_apply_message
    Rails.logger.info("###### Project refuse_transfer_service end ######")

    return @applied_transfer_project
  end

  private 
  def validate! 
    raise Error, '该仓库未在迁移' unless @applied_transfer_project.present? && @project.is_transfering
    raise Error, '未拥有拒绝转移权限' unless is_permit_operator
  end

  def is_permit_operator
    return true if @user == @owner
    return @owner.is_a?(Organization) && @owner.is_admin?(@user)
  end

  def update_apply 
    @applied_transfer_project.update!(status: 'refused')
  end

  def send_apply_message 
    SendTransferProjectAppliedMessageJob.perform_now(@applied_transfer_project, @user, 'failure')
  end
end