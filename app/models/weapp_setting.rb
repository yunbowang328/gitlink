class WeappSetting < ApplicationRecord
  scope :only_online, -> { where(online: true) }
end