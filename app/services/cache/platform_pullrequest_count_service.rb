class Cache::PlatformPullrequestCountService < ApplicationService 
  attr_reader :increment_count

  def initialize(increment_count=0)
    @increment_count = increment_count
  end

  def call 
    set_platform_pullrequest_count

    platform_pullrequest_count
  end

  def reset 
    reset_platform_pullrequest_count

    platform_pullrequest_count
  end

  private 

  def platform_pullrequest_count_key 
    "platform-pullrequest-count"
  end

  def platform_pullrequest_count 
    $redis_cache.get(platform_pullrequest_count_key).to_i
  end

  def set_platform_pullrequest_count 
    if $redis_cache.exists(platform_pullrequest_count_key)
      $redis_cache.incrby(platform_pullrequest_count_key, increment_count)
    else
      reset_platform_pullrequest_count
    end
  end

  def reset_platform_pullrequest_count
    $redis_cache.set(platform_pullrequest_count_key, PullRequest.count)
  end
end