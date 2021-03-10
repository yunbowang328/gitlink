# == Schema Information
#
# Table name: phenglei_users
#
#  id         :integer          not null, primary key
#  phone      :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class PhengleiUser < ApplicationRecord

  validates :phone, uniqueness: true

  def register 
    User.find_by(phone: self.phone)
  end
end
