class SendTransferProjectAppliedMessageJob < ApplicationJob
  queue_as :default

  def perform(applied_transfer_project, applied_user, message_status)
    project = applied_transfer_project.project 
    owner = applied_transfer_project.owner
    return unless project.present?
    return unless owner.present?
    if owner.is_a?(Organization)
      receivers = project.managers + owner.team_users.joins(:team).where(teams: {authorize: %w(owner admin)})
    else
      receivers = project.managers
    end
    receivers.each do |rec|
      AppliedMessage.create!(user_id: rec.user_id, 
                             applied: applied_transfer_project,
                             status: message_status,
                             name: build_name(project.name, owner.real_name, message_status),
                             applied_user_id: applied_user.id, 
                             project_id: project.id)
    end
  end

  private 
  def build_name(repo_name, owner_name, message_status)
    case message_status
    when 'canceled'
      return "取消转移【#{repo_name}】仓库"
    when 'common'
      return "正在将【#{repo_name}】仓库转移给【#{owner_name}】"
    when 'successed'
      return "【#{repo_name}】仓库成功转移给【#{owner_name}】"
    when 'failure'
      return "【#{repo_name}】仓库转移失败"
    end
    ""
  end
end