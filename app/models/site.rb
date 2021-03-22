# == Schema Information
#
# Table name: sites
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  url        :string(255)
#  key        :string(255)
#  site_type  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Site < ApplicationRecord
  # add: 添加类链接
  # personal: 个人名下类链接,
  # common: 普通链接
  enum site_type: { add: 0, personal: 1, common: 2 }

  def self.set_default
    
  end
end
