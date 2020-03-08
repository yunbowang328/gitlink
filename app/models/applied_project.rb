class AppliedProject < ApplicationRecord
  belongs_to :user
  belongs_to :project

  has_many :applied_messages, as: :applied, dependent: :destroy
  has_many :forge_activities, as: :forge_act, dependent: :destroy

  scope :pending, -> { where(status: 0) }
end
