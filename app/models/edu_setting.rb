# == Schema Information
#
# Table name: edu_settings
#
#  id          :integer          not null, primary key
#  name        :string(255)
#  value       :string(255)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  description :string(255)
#
# Indexes
#
#  index_edu_settings_on_name  (name) UNIQUE
#

class EduSetting < ApplicationRecord
  after_commit :expire_value_cache

  scope :by_search,     -> (keyword){ where("name LIKE :keyword OR value LIKE :keyword", keyword: "%#{strip_param(keyword)}%") unless strip_param(keyword).blank? }

  def value_cache_key
    self.class.value_cache_key(name)
  end

  def self.get(key)
    Rails.cache.fetch(value_cache_key(key), expires_in: 1.days) do
      find_by_name(key.to_s)&.value
    end
  end

  def self.value_cache_key(name)
    raise ArgumentError if name.blank?

    "educoder/edu-settings/#{name.to_s}"
  end

  private

  def expire_value_cache
    Rails.cache.write(value_cache_key, value)
  end
end
