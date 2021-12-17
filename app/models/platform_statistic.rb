# == Schema Information
#
# Table name: platform_statistics
#
#  id          :integer          not null, primary key
#  visits      :integer          default("0")
#  users_count :integer          default("0")
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class PlatformStatistic < ApplicationRecord

  def self.data
    data = self.last
    if data.present?
      return data 
    else
      return PlatformStatistic.create(users_count: User.count)
    end
  end
end
