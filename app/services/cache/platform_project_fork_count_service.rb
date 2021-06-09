class Cache::PlatformProjectForkCountService < ApplicationService 
  attr_reader :increment_count

  def initialize(increment_count=0)
    @increment_count = increment_count
  end

  def call 
    set_platform_project_fork_count

    platform_project_fork_count
  end

  def reset 
    reset_platform_project_fork_count

    platform_project_fork_count
  end

  private 

  def platform_project_fork_count_key 
    "platform-project-fork-count"
  end

  def platform_project_fork_count 
    $redis_cache.get(platform_project_fork_count_key).to_i
  end

  def set_platform_project_fork_count 
    if $redis_cache.exists(platform_project_fork_count_key)
      $redis_cache.incrby(platform_project_fork_count_key, increment_count)
    else
      reset_platform_project_fork_count
    end
  end

  def reset_platform_project_fork_count
    $redis_cache.set(platform_project_fork_count_key, ForkUser.count)
  end
end