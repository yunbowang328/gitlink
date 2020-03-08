class UserExtension < ApplicationRecord
  # identity 0: 教师教授 1: 学生, 2: 专业人士, 3: 开发者
  enum identity: { teacher: 0, student: 1, professional: 2, developer: 3, enterprise: 4, unselect: -1 }

  belongs_to :user, touch: true
  belongs_to :school, optional: true
  belongs_to :department, optional: true

  before_save :set_laboratory_school

  def identity_text
    I18n.t("user.identity.#{identity}")
  end

  private

  def set_laboratory_school
    return unless new_record?

    self.school_id = Laboratory.current.school_id if school_id.blank? && !Laboratory.current.main_site?
  end
end
