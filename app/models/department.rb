class Department < ApplicationRecord
  belongs_to :school

  has_many :department_members, dependent: :destroy
  has_many :member_users, through: :department_members, source: :user

  has_many :user_extensions, dependent: :nullify
  has_many :apply_add_departments, dependent: :destroy

  scope :without_deleted, -> { where(is_delete: false) }

  def member?(user)
    department_members.exists?(user_id: user.id)
  end

  def soft_delete!
    update!(is_delete: true)
  end
end
