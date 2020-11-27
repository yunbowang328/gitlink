class LimitForbidControl::Base
  def initialize
  end

  def cache_key
    raise 'Please overwrite method :cache_Key'
  end

  def forbid_cache_key
    "#{cache_key}:forbid"
  end

  def allow_times
    5
  end

  def cumulative_expires
    1.days
  end

  def forbid_expires
    1.hours
  end

  def forbid?
    Rails.cache.read(forbid_cache_key)
  end

  def increment!
    value = Rails.cache.read(cache_key)
    value = value.to_i + 1

    # 锁定
    if value >= allow_times.to_i
      Rails.logger.info("[LimitForbidControl] Lock #{cache_key}")
      Rails.cache.write(forbid_cache_key, true, expires_in: forbid_expires)
      Rails.cache.delete(cache_key)
    else
      Rails.cache.write(cache_key, value, expires_in: cumulative_expires)
    end
  end

  def error_times
    Rails.cache.read(cache_key).to_i
  end

  def remain_times
    allow_times.to_i - error_times
  end

  def clear
    Rails.logger.info("[LimitForbidControl] Clear #{cache_key}")
    Rails.cache.delete(forbid_cache_key)
    Rails.cache.delete(cache_key)
  end

  private

  def redis_cache?
    Rails.cache.is_a?(ActiveSupport::Cache::RedisStore)
  end

  def day
    Time.current.strftime('%Y%m%d')
  end
end