class Cache::UserProjectCountService < ApplicationService 
  attr_reader :user, :increment_count

  def initialize(user, increment_count=0)
    @user = user
    @increment_count = increment_count
  end

  def call 
    set_user_project_count

    user_project_count
  end

  def reset 
    reset_user_project_count

    user_project_count
  end

  private 

  def user_project_count_key 
    "user-project-count-#{user.id}"
  end

  def user_project_count 
    $redis_cache.get(user_project_count_key).to_i
  end

  def set_user_project_count 
    if $redis_cache.exists(user_project_count_key)
      $redis_cache.incrby(user_project_count_key, increment_count)
    else
      reset_user_project_count
    end
  end

  def reset_user_project_count
    return if user.nil?
    $redis_cache.set(user_project_count_key, user.projects.count)
  end
end