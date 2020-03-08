class EduSetting < ApplicationRecord
  after_commit :expire_value_cache

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
