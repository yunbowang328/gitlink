class Customer < ApplicationRecord
  default_scope { order(created_at: :desc) }

  belongs_to :school
  belongs_to :partner_manager_group, optional: true

  has_many :partner_customers, dependent: :destroy
  has_many :partners, through: :partner_customers

  has_many :users
end