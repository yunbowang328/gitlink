# 删除部门 消息通知
class DeleteDepartmentNotifyJob < ApplicationJob
  queue_as :notify

  def perform(department_id, operator_id, user_ids)
    department = Department.unscoped.find_by(id: department_id)
    return if department.blank? || user_ids.blank?

    attrs = %i[ user_id trigger_user_id container_id container_type tiding_type status created_at updated_at]

    same_attrs = {
      trigger_user_id: operator_id, container_id: department.id, container_type: 'Department',
      status: 4, tiding_type: 'System'
    }
    Tiding.bulk_insert(*attrs) do |worker|
      user_ids.each do |user_id|
        worker.add same_attrs.merge(user_id: user_id)
      end
    end
  end
end
