class Cache::PlatformIssueCountService < ApplicationService 
  attr_reader :increment_count

  def initialize(increment_count=0)
    @increment_count = increment_count
  end

  def call 
    set_platform_issue_count

    platform_issue_count
  end

  def reset 
    reset_platform_issue_count

    platform_issue_count
  end

  private 

  def platform_issue_count_key 
    "platform-issue-count"
  end

  def platform_issue_count 
    $redis_cache.get(platform_issue_count_key).to_i
  end

  def set_platform_issue_count 
    if $redis_cache.exists(platform_issue_count_key)
      $redis_cache.incrby(platform_issue_count_key, increment_count)
    else
      reset_platform_issue_count
    end
  end

  def reset_platform_issue_count
    $redis_cache.set(platform_issue_count_key, Issue.count)
  end
end