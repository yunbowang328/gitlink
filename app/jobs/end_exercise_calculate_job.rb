class EndExerciseCalculateJob < ApplicationJob

  include ExercisesHelper
  include GitHelper

  queue_as :default

  def perform(ex_user_ids,exercise,end_time)
    exercise_users = ExerciseUser.where(id: ex_user_ids)
    exercise_users.each do |user|
      if user.commit_status == 0 && user.start_at.present?
        objective_score = calculate_student_score(exercise,user.user,end_time.to_time)[:total_score]
        user_sub_score = user.subjective_score
        subjective_score = user_sub_score < 0.0 ? 0.0 : user_sub_score
        total_score = objective_score + subjective_score
        commit_option = {
          :status => 1,
          :commit_status => 1,
          :end_at => Time.now,
          :objective_score => objective_score,
          :score => total_score,
          :subjective_score => user_sub_score,
          :commit_method => user&.commit_method.to_i > 0 ? user&.commit_method.to_i : 4
        }
        user.update_attributes(commit_option)
      end
    end
  end

end
