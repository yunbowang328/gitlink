class Cache::UserProjectPraisesCountService < ApplicationService 
  attr_reader :user, :increment_count

  def initialize(user, increment_count=0)
    @user = user
    @increment_count = increment_count
  end

  def call 
    set_user_project_praises_count

    user_project_praises_count
  end

  def reset 
    reset_user_project_praises_count

    user_project_praises_count
  end

  private 

  def user_project_praises_count_key 
    "user-project-praises-count-#{user.id}"
  end

  def user_project_praises_count 
    $redis_cache.get(user_project_praises_count_key).to_i
  end

  def set_user_project_praises_count 
    if $redis_cache.exists(user_project_praises_count_key)
      $redis_cache.incrby(user_project_praises_count_key, increment_count)
    else
      reset_user_project_praises_count
    end
  end

  def reset_user_project_praises_count
    return if user.nil?
    $redis_cache.set(user_project_praises_count_key, PraiseTread.where(praise_tread_object_type: 'Project', praise_tread_object_id: user.projects).count)
  end
end