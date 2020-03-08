# 申请成为 管理员、开发者 加入项目 消息通知
class ApplyJoinProjectNotifyJob < ApplicationJob
  queue_as :notify

  def perform(user_id, project_id, role)
    user = User.find_by(id: user_id)
    project = Project.find_by(id: project_id)
    return if user.blank? || project.blank?

    attrs = %i[user_id trigger_user_id container_id container_type status
              belong_container_id belong_container_type tiding_type extra created_at updated_at]

    same_attrs = {
      trigger_user_id: user.id, status: 0, tiding_type: 'Apply', extra: role,
      container_id: project.id, container_type: 'JoinProject',
      belong_container_id: project.id, belong_container_type: 'Project'
    }

    # 报告人员加入时消息为系统通知消息
    if role == 5
      same_attrs[:container_type] = 'ReporterJoinProject'
      same_attrs[:tiding_type]    = 'System'
    end

    Tiding.bulk_insert(*attrs) do |worker|
      project.manager_members.each do |manager|
        worker.add(same_attrs.merge(user_id: manager.user_id))
      end
    end
  end
end
