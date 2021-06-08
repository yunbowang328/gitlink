class Cache::UserPullrequestCountService < ApplicationService 
  attr_reader :user, :increment_count

  def initialize(user, increment_count=0)
    @user = user
    @increment_count = increment_count
  end

  def call 
    set_user_pullrequest_count

    user_pullrequest_count
  end

  def reset 
    reset_user_pullrequest_count

    user_pullrequest_count
  end

  private 

  def user_pullrequest_count_key 
    "user-pullrequest-count-#{user.id}"
  end

  def user_pullrequest_count 
    $redis_cache.get(user_pullrequest_count_key).to_i
  end

  def set_user_pullrequest_count 
    if $redis_cache.exists(user_pullrequest_count_key)
      $redis_cache.incrby(user_pullrequest_count_key, increment_count)
    else
      reset_user_pullrequest_count
    end
  end

  def reset_user_pullrequest_count
    return if user.nil?
    $redis_cache.set(user_pullrequest_count_key, PullRequest.where(user_id: user.id).count)
  end
end