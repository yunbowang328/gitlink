class Sponsorship < ApplicationRecord
  belongs_to :sponsor, class_name: 'User'
  belongs_to :developer, class_name: 'User'
  validates :amount, presence: true

  def stop
    stopped_sponsorship = StoppedSponsorship.new(developer_id: developer_id, sponsor_id: sponsor_id, start_time: created_at, amount: amount, visible: visible, accumulate: accumulate)
    stopped_sponsorship.save && destroy
  end

  def pay
    sponsor.create_wallet(balance: 0) if sponsor.wallet.nil?
    developer.create_wallet(balance: 0) if developer.wallet.nil?
    sponsor_wallet = sponsor.wallet
    developer_wallet = developer.wallet

    return false if sponsor.wallet.balance < amount

    reason = "#{sponsor.full_name}向#{developer.full_name}的赞助支付。"
    coinchange = CoinChange.new(amount: amount, reason: reason, to_wallet_id: developer_wallet.id, from_wallet_id: sponsor_wallet.id)
    if coinchange.save
      sponsor_wallet.update(balance: sponsor_wallet.balance -= amount)
      developer_wallet.update(balance: developer_wallet.balance += amount)
      update(accumulate: self.accumulate += amount)
      return true
    end
    false
  end

  def self.monthly_payment
    sponsorships = Sponsorship.all
    sponsorships.each do |s|
      s.stop unless s.pay
    end
  end
end
