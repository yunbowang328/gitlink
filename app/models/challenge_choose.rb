class ChallengeChoose < ApplicationRecord
  default_scope {order("challenge_chooses.position asc")}
  belongs_to :challenge, optional: true
  has_many :challenge_tags, :dependent => :destroy
  has_many :challenge_questions, dependent: :destroy

  validates :subject, length: { maximum: 25000, too_long: "不能超过25000个字符" }

end
