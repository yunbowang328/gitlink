# 毕设任务的交叉评阅分配
class GraduationTaskCrossCommentJob < ApplicationJob
  queue_as :default

  def perform(graduation_task_id)
    task = GraduationTask.find_by(id: graduation_task_id)
    return if task.blank?

    task.graduation_task_group_assignations.includes(:graduation_group, :graduation_work).each do |assignation|
      graduation_group = assignation.graduation_group
      work = assignation.graduation_work
      if graduation_group.present? && work.present?
        member_ids = graduation_group.course_members.pluck(:user_id).uniq
        member_ids.each do |user_id|
          unless work.graduation_work_comment_assignations.exists?(user_id: user_id)
            work.graduation_work_comment_assignations << GraduationWorkCommentAssignation.new(user_id: user_id, graduation_task_id: task.id)
          end
        end
      end
    end
  end
end
