class Projects::RefuseJoinService < ApplicationService
  attr_accessor :applied_project, :owner
  attr_reader :user, :project 

  def initialize(user, applied_project)
    @user   = user
    @project = applied_project.project
    @applied_project = applied_project
  end

  def call 
    Rails.logger.info("###### Project refuse_join_service begin ######")
    validate!
    update_apply 
    send_apply_message
    Rails.logger.info("###### Project refuse_join_service end ######")

    return @applied_project
  end

  private 
  def validate! 
    raise Error, '该申请已被拒绝' if @applied_project.refused?
    raise Error, '该申请不存在' unless @applied_project.present?
    raise Error, '未拥有接受申请权限' unless is_permit_operator
  end

  def is_permit_operator
    return @user.admin? || @project.manager?(@user)
  end

  def update_apply 
    @applied_project.update!(status: 'refused')
  end

  def send_apply_message 
    SendJoinProjectAppliedMessageJob.perform_now(@applied_project, @user, 'failure')
  end
end