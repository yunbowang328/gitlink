class SendJoinProjectAppliedMessageJob < ApplicationJob
  queue_as :default

  def perform(applied_project, applied_user, message_status)
    project = applied_project.project 
    return unless project.present?
    return unless applied_user.present?
    return unless applied_project.user.present?
    AppliedMessage.find_or_create_by!(user_id: applied_project.user_id,
      applied: applied_project,
      status: message_status,
      name: build_name(project.name, message_status),
      applied_user_id: applied_user.id,
      project_id: project.id)
  end

  private 
  def build_name(repo_name, message_status, applied_name="")
    case message_status
    when 'successed'
      return "已通过你加入【#{repo_name}】仓库的申请。"
    when 'failure'
      return "已拒绝你加入【#{repo_name}】仓库的申请。"
    end
    ""
  end
end