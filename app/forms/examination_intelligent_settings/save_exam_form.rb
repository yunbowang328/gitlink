class ExaminationIntelligentSettings::SaveExamForm
  include ActiveModel::Model

  attr_accessor :name, :duration

  validates :name, presence: true, length: { maximum: 60 }
  validate :validate_duration

  def validate_duration
    raise '时长应为大于0的整数' if duration.present? && duration.to_i < 1
  end
end