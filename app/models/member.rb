class Member < ApplicationRecord
  belongs_to :user
  belongs_to :course, optional: true
  belongs_to :project, optional: true

  has_many :member_roles, dependent: :destroy
  has_many :roles, through: :member_roles

  validates :user_id, :project_id, presence: true

end
