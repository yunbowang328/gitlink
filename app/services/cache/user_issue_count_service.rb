class Cache::UserIssueCountService < ApplicationService 
  attr_reader :user, :increment_count

  def initialize(user, increment_count=0)
    @user = user
    @increment_count = increment_count
  end

  def call 
    set_user_issue_count

    user_issue_count
  end

  def reset 
    reset_user_issue_count

    user_issue_count
  end

  private 

  def user_issue_count_key 
    "user-issue-count-#{user.id}"
  end

  def user_issue_count 
    $redis_cache.get(user_issue_count_key).to_i
  end

  def set_user_issue_count 
    if $redis_cache.exists(user_issue_count_key)
      $redis_cache.incrby(user_issue_count_key, increment_count)
    else
      reset_user_issue_count
    end
  end

  def reset_user_issue_count
    return if user.nil?
    $redis_cache.set(user_issue_count_key, Issue.where(author_id: user.id).count)
  end
end