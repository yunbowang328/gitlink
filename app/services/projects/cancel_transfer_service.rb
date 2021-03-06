class Projects::CancelTransferService < ApplicationService
  attr_accessor :applied_transfer_project
  attr_reader :user, :project 

  def initialize(user, project)
    @user   = user
    @project = project
    @applied_transfer_project = project.applied_transfer_project
  end

  def call 
    Rails.logger.info("###### Project cancel_transfer_service begin ######")
    validate!
    update_apply 
    send_apply_message
    Rails.logger.info("###### Project cancel_transfer_service end ######")

    return @applied_transfer_project
  end

  private 
  def validate! 
    raise Error, '该仓库未在迁移' unless @applied_transfer_project.present? && @project.is_transfering
  end

  def update_apply 
    @applied_transfer_project.update!(status: 'canceled')
  end

  def send_apply_message 
    SendTransferProjectAppliedMessageJob.perform_now(@applied_transfer_project, @user, 'canceled')
  end
end