# == Schema Information
#
# Table name: bidding_users
#
#  id                 :integer          not null, primary key
#  project_package_id :integer
#  user_id            :integer
#  status             :string(255)
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#
# Indexes
#
#  index_bidding_users_on_project_package_id  (project_package_id)
#  index_bidding_users_on_user_id             (user_id)
#

class BiddingUser < ApplicationRecord
  include AASM

  belongs_to :user
  belongs_to :project_package, counter_cache: true

  aasm(:status) do
    state :pending, initial: true
    state :bidding_won
    state :bidding_lost

    event :win do
      transitions from: [:pending], to: :bid_won
    end

    event :lose do
      transitions from: [:pending], to: :bid_lost
    end
  end

  def status_text
    I18n.t("bidding_user.status.#{status}")
  end
end
