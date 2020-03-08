class ExaminationIntelligentSettings::SaveExamSettingForm
  include ActiveModel::Model

  attr_accessor :discipline_id, :sub_discipline_id, :source, :difficulty, :tag_discipline_id, :question_settings

  validates :discipline_id, presence: true
  validates :sub_discipline_id, presence: true
  validates :source, presence: true
  validates :difficulty, presence: true, inclusion: {in: 1..3}, numericality: { only_integer: true }
  validates :question_settings, presence: true
end