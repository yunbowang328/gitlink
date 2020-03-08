class Users::UpdateAccountForm
  include ActiveModel::Model

  attr_accessor :user
  attr_accessor :nickname, :name, :show_realname, :gender, :location, :location_city,
                :identity, :student_id, :technical_title, :school_id, :department_id

  validates :nickname, presence: true, length: { minimum: 2, maximum: 20 }, format: { with: CustomRegexp::NICKNAME, message: "2-20位中英文、数字及下划线" }
  validates :name, presence: true, length: { minimum: 2, maximum: 10 }, format: { with: CustomRegexp::LASTNAME, message: "2-10位中英文、数字" }
  validates :gender, presence: true, numericality: { only_integer: true }, inclusion: { in: [0, 1] }
  validates :location, presence: true
  validates :location_city, presence: true
  validates :identity, presence: true, inclusion: { in: %w[teacher student professional ] }
  validates :technical_title, presence: true, unless: -> { identity.to_s == 'student' }
  validates :student_id, presence: true, if: -> { identity.to_s == 'student' }
  validates :school_id, presence: true

  validate :check_school_exist
  def check_school_exist
    return if school_id.blank?
    unless School.exists?(id: school_id)
      errors.add(:school_id, :not_exist)
    end
  end

  validate :check_department_exist
  def check_department_exist
    return if department_id.blank?
    unless Department.exists?(id: department_id)
      errors.add(:department_id, :not_exist)
    end
  end
end