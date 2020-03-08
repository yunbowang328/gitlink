class CourseDeleteStudentDeleteWorksJob < ApplicationJob
  queue_as :default

  def perform(course_id, student_ids)
    course = Course.find_by(id: course_id)
    return if course.blank?

    student_works = StudentWork.joins(:homework_common).where(user_id: student_ids, homework_commons: {course_id: course.id})
    student_works.update_all(is_delete: 1)

    exercise_users = ExerciseUser.joins(:exercise).where(user_id: student_ids, exercises: {course_id: course.id})
    exercise_users.update_all(is_delete: 1)

    poll_users = PollUser.joins(:poll).where(user_id: student_ids, polls: {course_id: course.id})
    poll_users.update_all(is_delete: 1)

    course.graduation_works.where(user_id: student_ids).update_all(is_delete: 1)
  end
end
