class Owner < ApplicationRecord
  self.table_name = "users"

  include ProjectOperable
  include ProjectAbility

  has_many :projects, foreign_key: :user_id, dependent: :destroy
  has_many :repositories, foreign_key: :user_id, dependent: :destroy
end