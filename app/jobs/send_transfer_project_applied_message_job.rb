class SendTransferProjectAppliedMessageJob < ApplicationJob
  queue_as :default

  def perform(applied_transfer_project, applied_user, message_status)
    project = applied_transfer_project.project 
    owner = project.owner
    return unless project.present?
    return unless owner.present?
    if owner.is_a?(Organization)
      receivers = project.managers + owner.team_users.joins(:team).where(teams: {authorize: %w(owner admin)})
    else
      receivers = project.managers
    end
    receivers.each do |rec|
      next if applied_user.id == rec.user_id # 自己不要给自己发通知
      AppliedMessage.create!(user_id: rec.user_id, 
                             applied: applied_transfer_project,
                             status: message_status,
                             name: build_name(project.name, applied_transfer_project&.owner&.real_name, message_status),
                             applied_user_id: applied_user.id, 
                             project_id: project.id)
    end
    if message_status == 'successed' # 如果转移成功，给转移发起者发通知已转移成功
      AppliedMessage.find_or_create_by!(user_id: applied_transfer_project.user_id,
                                        applied: applied_transfer_project,
                                        status: message_status,
                                        name: build_name(project.name, applied_transfer_project&.owner&.real_name, message_status),
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