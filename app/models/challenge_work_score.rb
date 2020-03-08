class ChallengeWorkScore < ApplicationRecord
  belongs_to :user
  belongs_to :student_work
  belongs_to :challenge
  has_many :tidings, as: :container, dependent: :destroy

  validates :comment, length: { maximum: 500, too_long: "不能超过500个字符" }

  def create_tiding trigger_user_id
    tidings << Tiding.new(user_id: student_work.user_id, trigger_user_id: trigger_user_id, container_id: id,
                          container_type: "ChallengeWorkScore", parent_container_id: student_work_id,
                          parent_container_type: "StudentWork", belong_container_id: student_work&.homework_common&.course_id,
                          belong_container_type: "Course", viewed: 0, tiding_type: "HomeworkCommon")
  end
end
