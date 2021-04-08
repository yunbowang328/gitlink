# == Schema Information
#
# Table name: wallets
#
#  id         :integer          not null, primary key
#  balance    :integer
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Wallet < ApplicationRecord
  belongs_to :user
  has_many :outcome, class_name: 'CoinChange', foreign_key: 'from_wallet_id', dependent: :destroy
  has_many :income, class_name: 'CoinChange', foreign_key: 'to_wallet_id', dependent: :destroy
  validates :balance, presence: true
end
