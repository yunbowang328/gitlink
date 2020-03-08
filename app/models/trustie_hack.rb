class TrustieHack < ApplicationRecord
  validates_length_of :description, maximum: 500, message: "不能超过500个字符"
  has_many :hack_users, :dependent => :destroy
  belongs_to :trustie_hackathon, counter_cache: true


  def entry_info(user_id)
    hack_users.exists?(user_id: user_id)
  end
end
