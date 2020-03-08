# 学生加入课堂时创建相关任务作品
class CourseAddStudentCreateWorksJob < ApplicationJob
  queue_as :default

  def perform(course_id, student_ids)
    course = Course.find_by(id: course_id)
    return if course.blank?

    # 如果之前存在相关作品，则更新is_delete字段
    student_works = StudentWork.joins(:homework_common).where(user_id: student_ids, homework_commons: {course_id: course.id})
    student_works.update_all(is_delete: 0)

    exercise_users = ExerciseUser.joins(:exercise).where(user_id: student_ids, exercises: {course_id: course.id})
    exercise_users.update_all(is_delete: 0)

    poll_users = PollUser.joins(:poll).where(user_id: student_ids, polls: {course_id: course.id})
    poll_users.update_all(is_delete: 0)

    graduation_works = course.graduation_works.where(user_id: student_ids)
    graduation_works.update_all(is_delete: 0)

    attrs = %i[homework_common_id user_id created_at updated_at]

    StudentWork.bulk_insert(*attrs) do |worker|
      student_ids.each do |user_id|
        same_attrs = {user_id: user_id}
        course.homework_commons.where(homework_type: %i[normal group practice]).each do |homework|
          next if StudentWork.where(user_id: user_id, homework_common_id: homework.id).any?
          worker.add same_attrs.merge(homework_common_id: homework.id)
        end
      end
    end

    attrs = %i[exercise_id user_id created_at updated_at]
    ExerciseUser.bulk_insert(*attrs) do |worker|
      student_ids.each do |user_id|
        same_attrs = {user_id: user_id}
        course.exercises.each do |exercise|
          next if ExerciseUser.where(user_id: user_id, exercise_id: exercise.id).any?
          worker.add same_attrs.merge(exercise_id: exercise.id)
        end
      end
    end

    attrs = %i[poll_id user_id created_at updated_at]
    PollUser.bulk_insert(*attrs) do |worker|
      student_ids.each do |user_id|
        same_attrs = {user_id: user_id}
        course.polls.each do |poll|
          next if PollUser.where(user_id: user_id, poll_id: poll.id).any?
          worker.add same_attrs.merge(poll_id: poll.id)
        end
      end
    end

    attrs = %i[graduation_task_id user_id course_id created_at updated_at]
    GraduationWork.bulk_insert(*attrs) do |worker|
      student_ids.each do |user_id|
        same_attrs = {user_id: user_id, course_id: course.id}
        course.graduation_tasks.each do |task|
          next if GraduationWork.where(user_id: user_id, graduation_task_id: task.id).any?
          worker.add same_attrs.merge(graduation_task_id: task.id)
        end
      end
    end
  end
end
