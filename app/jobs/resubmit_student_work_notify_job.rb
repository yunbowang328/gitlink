class ResubmitStudentWorkNotifyJob < ApplicationJob
  queue_as :notify

  def perform(homework_id, student_ids)
    homework = HomeworkCommon.find_by(id: homework_id)
    return if homework.blank? || student_ids.blank?
    course = homework.course

    attrs = %i[user_id trigger_user_id container_id container_type parent_container_id parent_container_type
              belong_container_id belong_container_type tiding_type viewed created_at updated_at]

    same_attrs = {
      container_type: 'ResubmitStudentWork', parent_container_id: homework.id, parent_container_type: 'HomeworkCommon',
      belong_container_id: course.id, belong_container_type: 'Course', tiding_type: 'HomeworkCommon', viewed: 0
    }
    Tiding.bulk_insert(*attrs) do |worker|
      student_ids.each do |user_id|
        next unless User.exists?(id: user_id)

        work = homework.student_works.find_by(user_id: user_id)
        next if work.blank?
        score_user_ids = work.student_works_scores.where.not(score: nil).where(reviewer_role: [1, 2]).pluck(user_id).uniq
        next if score_user_ids.blank?

        attrs = same_attrs.merge(trigger_user_id: user_id, container_id: work.id)

        score_user_ids.each do |user_id|
          worker.add attrs.merge(user_id: user_id)
        end
      end
    end
  end
end
