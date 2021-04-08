# == Schema Information
#
# Table name: stopped_sponsorships
#
#  id           :integer          not null, primary key
#  amount       :integer
#  sponsor_id   :integer
#  developer_id :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  start_time   :datetime
#  visible      :integer
#  accumulate   :integer          default("0")
#

class StoppedSponsorship < ApplicationRecord
  belongs_to :sponsor, class_name: 'User'
  belongs_to :developer, class_name: 'User'
  validates :amount, presence: true
end
