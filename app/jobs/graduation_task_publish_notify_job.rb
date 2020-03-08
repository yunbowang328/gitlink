# 任务发布 消息通知
class GraduationTaskPublishNotifyJob < ApplicationJob
  queue_as :notify

  def perform(graduation_task_id)
    task = GraduationTask.find_by(id: graduation_task_id)
    return if task.blank?
    course = task.course
    return if course.blank?

    attrs = %i[
      user_id trigger_user_id container_id container_type parent_container_id parent_container_type
      belong_container_id belong_container_type viewed tiding_type created_at updated_at
    ]

    same_attrs = {
      trigger_user_id: task.user_id, container_id: task.id, container_type: 'GraduationTask',
      parent_container_id: task.id, parent_container_type: 'TaskPublish',
      belong_container_id: task.course_id, belong_container_type: 'Course',
      viewed: 0, tiding_type: 'GraduationTask'
    }
    Tiding.bulk_insert(*attrs) do |worker|
      course.course_members.pluck(:user_id).uniq.each do |user_id|
        worker.add same_attrs.merge(user_id: user_id)
      end
    end
  end
end
