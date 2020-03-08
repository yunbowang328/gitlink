# 删除课堂用户
class CourseDeleteStudentNotifyJob < ApplicationJob
  queue_as :notify

  def perform(course_id, student_ids, trigger_user_id)
    course = Course.find_by(id: course_id)
    return if course.blank?

    attrs = %i[user_id trigger_user_id container_id container_type belong_container_id
              belong_container_type tiding_type created_at updated_at]

    same_attrs = {
      trigger_user_id: trigger_user_id, container_id: course.id, container_type: 'DeleteCourseMember',
      belong_container_id: course.id, belong_container_type: 'Course', tiding_type: 'System'
    }
    Tiding.bulk_insert(*attrs) do |worker|
      student_ids.each do |user_id|
        worker.add same_attrs.merge(user_id: user_id)
      end
    end
  end
end
