# == Schema Information
#
# Table name: coin_changes
#
#  id             :integer          not null, primary key
#  amount         :integer
#  description    :string(255)
#  reason         :string(255)
#  to_wallet_id   :integer
#  from_wallet_id :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class CoinChange < ApplicationRecord
  belongs_to :to_wallet, class_name: 'Wallet'
  belongs_to :from_wallet, class_name: 'Wallet', optional: true
  validates :amount, presence: true
end
