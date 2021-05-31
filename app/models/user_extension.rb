# == Schema Information
#
# Table name: user_extensions
#
#  id                 :integer          not null, primary key
#  user_id            :integer          not null
#  birthday           :date
#  brief_introduction :string(255)
#  gender             :integer
#  location           :string(255)
#  occupation         :string(255)
#  work_experience    :integer
#  zip_code           :integer
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  technical_title    :string(255)
#  identity           :integer
#  student_id         :string(255)
#  teacher_realname   :string(255)
#  student_realname   :string(255)
#  location_city      :string(255)
#  school_id          :integer
#  description        :string(255)      default("")
#  department_id      :integer
#  province           :string(255)
#  city               :string(255)
#  custom_department  :string(255)
#
# Indexes
#
#  index_user_extensions_on_department_id          (department_id)
#  index_user_extensions_on_school_id_and_user_id  (school_id,user_id)
#  index_user_extensions_on_user_id                (user_id)
#

class UserExtension < ApplicationRecord
  # identity 0: 教师教授 1: 学生, 2: 专业人士, 3: 开发者
  enum identity: { teacher: 0, student: 1, professional: 2, developer: 3, enterprise: 4, unselect: -1 }

  belongs_to :user, touch: true
  belongs_to :school, optional: true
  # belongs_to :department, optional: true

  # before_save :set_laboratory_school

  def identity_text
    I18n.t("user.identity.#{identity}")
  end

  private

  def set_laboratory_school
    # return unless new_record?

    # self.school_id = Laboratory.current.school_id if school_id.blank? && !Laboratory.current.main_site?
  end
end
