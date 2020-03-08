class ChallengeAnswer < ApplicationRecord
  default_scope { order("challenge_answers.level asc") }
  belongs_to :challenge
  has_many :game_answers, :dependent => :destroy

  validates :contents, length: { maximum: 25000 , too_long: "不能超过25000个字符"}

  def view_answer_time(user_id)
    game_answers.where(user_id: user_id).last&.view_time
  end
end
