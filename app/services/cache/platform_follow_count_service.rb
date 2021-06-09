class Cache::PlatformFollowCountService < ApplicationService 
  attr_reader :increment_count

  def initialize(increment_count=0)
    @increment_count = increment_count
  end

  def call 
    set_platform_follow_count

    platform_follow_count
  end

  def reset 
    reset_platform_follow_count

    platform_follow_count
  end

  private 

  def platform_follow_count_key 
    "platform-follow-count"
  end

  def platform_follow_count 
    $redis_cache.get(platform_follow_count_key).to_i
  end

  def set_platform_follow_count 
    if $redis_cache.exists(platform_follow_count_key)
      $redis_cache.incrby(platform_follow_count_key, increment_count)
    else
      reset_platform_follow_count
    end
  end

  def reset_platform_follow_count
    $redis_cache.set(platform_follow_count_key, Watcher.where(watchable_type: 'User').count)
  end
end