class ExaminationBanks::SaveExamForm
  include ActiveModel::Model

  attr_accessor :discipline_id, :sub_discipline_id, :difficulty, :name, :duration, :tag_discipline_id

  validates :discipline_id, presence: true
  validates :sub_discipline_id, presence: true
  validates :difficulty, presence: true, inclusion: {in: 1..3}, numericality: { only_integer: true }
  validates :name, presence: true, length: { maximum: 60, too_long: "不能超过60个字符" }
  validate :validate_duration

  def validate_duration
    raise '时长应为大于0的整数' if duration.present? && duration.to_i < 1
  end
end