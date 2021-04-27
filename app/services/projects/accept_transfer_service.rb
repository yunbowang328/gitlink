class Projects::AcceptTransferService < ApplicationService
  attr_accessor :applied_transfer_project, :owner
  attr_reader :user, :project 

  def initialize(user, project)
    @user   = user
    @project = project
    @applied_transfer_project = project.applied_transfer_project
    @owner = @applied_transfer_project.owner
  end

  def call 
    Rails.logger.info("###### Project accept_transfer_service begin ######")
    ActiveRecord::Base.transaction do
      validate!
      update_apply 
      operate_project
      send_apply_message
    end

    Rails.logger.info("##### Project accept_transfer_service end ######")


    return @applied_transfer_project
  end

  private 
  def validate! 
    raise Error, '该仓库未在迁移' unless @applied_transfer_project.present? && @project.is_transfering
    raise Error, '未拥有接受转移权限' unless is_permit_operator
  end

  def is_permit_operator
    return true if @user == @owner
    return @owner.is_a?(Organization) && @owner.is_admin?(@user)
  end

  def update_apply 
    @applied_transfer_project.update!(status: 'accepted')
  end

  def operate_project 
    @project = Projects::TransferService.call(@project, @owner)
  end

  def send_apply_message 
    SendTransferProjectAppliedMessageJob.perform_now(@applied_transfer_project, @user, 'successed')
  end
end