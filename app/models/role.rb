class Role < ApplicationRecord
  has_many :member_roles, dependent: :destroy
end