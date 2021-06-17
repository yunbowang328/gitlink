class Cache::UserFollowCountService < ApplicationService 
  attr_reader :user, :increment_count

  def initialize(user, increment_count=0)
    @user = user
    @increment_count = increment_count
  end

  def call 
    set_user_follow_count

    user_follow_count
  end

  def reset 
    reset_user_follow_count

    user_follow_count
  end

  private 

  def user_follow_count_key 
    "user-follow-count-#{user.id}"
  end

  def user_follow_count 
    $redis_cache.get(user_follow_count_key).to_i
  end

  def set_user_follow_count 
    if $redis_cache.exists(user_follow_count_key)
      $redis_cache.incrby(user_follow_count_key, increment_count)
    else
      reset_user_follow_count
    end
  end

  def reset_user_follow_count
    return if user.nil?
    $redis_cache.set(user_follow_count_key, Watcher.where(watchable: user).count)
  end
end