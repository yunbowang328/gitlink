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