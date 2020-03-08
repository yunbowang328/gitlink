# 申请成为老师加入课堂 消息通知
class ApplyTeacherRoleJoinCourseNotifyJob < ApplicationJob
  queue_as :notify

  def perform(user_id, course_id, role)
    user = User.find_by(id: user_id)
    course = Course.find_by(id: course_id)
    return if user.blank? || course.blank?

    attrs = %i[user_id trigger_user_id container_id container_type belong_container_id
              belong_container_type tiding_type status extra created_at updated_at]

    same_attrs = {
      trigger_user_id: user.id, container_id: course.id, container_type: 'JoinCourse', status: 0,
      belong_container_id: course.id, belong_container_type: 'Course', tiding_type: 'Apply', extra: role
    }
    Tiding.bulk_insert(*attrs) do |worker|
      course.teachers_without_assistant_professor.each do |teacher|
        worker.add same_attrs.merge(user_id: teacher.user_id)
      end
    end
  end
end
