class Wallet < ApplicationRecord
  belongs_to :user
  has_many :outcome, class_name: 'CoinChange', foreign_key: 'from_wallet_id', dependent: :destroy
  has_many :income, class_name: 'CoinChange', foreign_key: 'to_wallet_id', dependent: :destroy
  validates :balance, presence: true
end
