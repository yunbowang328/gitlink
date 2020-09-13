class StoppedSponsorship < ApplicationRecord
  belongs_to :sponsor, class_name: 'User'
  belongs_to :developer, class_name: 'User'
  validates :amount, presence: true
end
