# == Schema Information
#
# Table name: weapp_settings
#
#  id         :integer          not null, primary key
#  type       :string(255)
#  link       :string(255)
#  online     :boolean          default("0")
#  position   :integer          default("0")
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class WeappSetting < ApplicationRecord
  scope :only_online, -> { where(online: true) }
end
