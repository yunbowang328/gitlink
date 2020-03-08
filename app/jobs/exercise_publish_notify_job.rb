# 试卷发布 消息通知
class ExercisePublishNotifyJob < ApplicationJob
  queue_as :notify

  def perform(exercise_id, group_ids)
    exercise = Exercise.find_by(id: exercise_id)
    return if exercise.blank?
    user = exercise.user
    course = exercise.course

    if group_ids.present?
      students = course.students.where(course_group_id: group_ids)
      subquery = course.teacher_course_groups.where(course_group_id: group_ids).select(:course_member_id)
      teachers = course.teachers.where(id: subquery)
    else
      students = course.students
      teachers = course.teachers
    end

    attrs = %i[
      user_id trigger_user_id container_id container_type parent_container_id parent_container_type
      belong_container_id belong_container_type viewed tiding_type created_at updated_at
    ]

    same_attrs = {
      trigger_user_id: user.id, container_id: exercise.id, container_type: 'Exercise',
      parent_container_id: exercise.id, parent_container_type: 'ExercisePublish',
      belong_container_id: exercise.course_id, belong_container_type: 'Course',
      viewed: 0, tiding_type: 'Exercise'
    }
    Tiding.bulk_insert(*attrs) do |worker|
      teacher_ids = teachers.pluck(:user_id)
      unless exercise.tidings.exists?(parent_container_type: 'ExercisePublish', user_id: teacher_ids)
        teacher_ids.each do |user_id|
          worker.add same_attrs.merge(user_id: user_id)
        end
      end

      students.pluck(:user_id).each do |user_id|
        worker.add same_attrs.merge(user_id: user_id)
      end
    end
  end
end
