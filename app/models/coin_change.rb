class CoinChange < ApplicationRecord
  belongs_to :to_wallet, class_name: 'Wallet'
  belongs_to :from_wallet, class_name: 'Wallet'
  validates :amount, presence: true
end
