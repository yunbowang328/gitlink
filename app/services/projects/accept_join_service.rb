class Projects::AcceptJoinService < ApplicationService
  attr_accessor :applied_project, :owner
  attr_reader :user, :project 

  def initialize(user, applied_project)
    @user   = user
    @project = applied_project.project
    @applied_project = applied_project
  end

  def call 
    Rails.logger.info("###### Project accept_join_service begin ######")
    ActiveRecord::Base.transaction do
      validate!
      update_apply 
      operate_project_member
      send_apply_message
    end

    Rails.logger.info("##### Project accept_join_service end ######")


    return @applied_project
  end

  private 
  def permission 
    case @applied_project.role 
    when 'manager'
      'admin'
    when 'developer'
      'write'
    when 'reporter'
      'read'
    else 
      'read'
    end
  end

  def validate! 
    raise Error, '该申请已经被接受' if @applied_project.accepted?
    raise Error, '该申请不存在' unless @applied_project.present?
    raise Error, '未拥有接受申请权限' unless is_permit_operator
  end

  def is_permit_operator
    return @user.admin? || @project.manager?(@user)
  end

  def update_apply 
    @applied_project.update!(status: 'accepted')
  end

  def operate_project_member
    Projects::AddMemberInteractor.call(@project.owner, @project, @applied_project.user, permission)
  end

  def send_apply_message 
    SendJoinProjectAppliedMessageJob.perform_now(@applied_project, @user, 'successed')
  end
end