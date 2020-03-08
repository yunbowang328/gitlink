class ChallengeQuestion < ApplicationRecord
  belongs_to :challenge_choose

  validates :option_name, length: { maximum: 500, too_long: "不能超过500个字符" }

end
