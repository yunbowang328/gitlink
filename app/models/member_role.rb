class MemberRole < ApplicationRecord
  belongs_to :role
  belongs_to :member

  validates :member_id, :role_id, presence: true
end
