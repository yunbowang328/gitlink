class CommitExercsieNotifyJobJob < ApplicationJob
  queue_as :notify

  def perform(exercise_id, user_id)
    exercise = Exercise.find_by(id: exercise_id)
    user = User.find_by(id: user_id)
    return if [exercise, user].any?(&:blank?)
    course = exercise.course

    attrs = %i[user_id trigger_user_id container_id container_type parent_container_id parent_container_type
              belong_container_id belong_container_type tiding_type viewed status created_at updated_at]

    same_attrs = {
      trigger_user_id: user.id,
      container_id: exercise.id, container_type: 'Exercise',
      parent_container_id: exercise.id, parent_container_type: 'CommitExercise',
      belong_container_id: course.id, belong_container_type: 'Course',
      tiding_type: 'Exercise', viewed: 0, status: 0
    }
    Tiding.bulk_insert(*attrs) do |worker|
      course.course_member(user).member_teachers.each do |teacher|
        worker.add same_attrs.merge(user_id: teacher.user_id)
      end
    end
  end
end
