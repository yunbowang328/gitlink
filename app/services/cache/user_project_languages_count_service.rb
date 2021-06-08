class Cache::UserProjectLanguagesCountService < ApplicationService 
  attr_reader :user, :key, :increment_count

  def initialize(user, key=nil, increment_count=0)
    @user = user
    @key = key
    @increment_count = increment_count
  end

  def call 
    set_user_project_language_count

    user_project_language_count
  end

  def reset_by_key
    reset_user_project_language_count_by_key

    user_project_language_count
  end

  def reset
    reset_user_project_language_count

    user_project_language_count
  end

  private 

  def user_project_language_count_key 
    "user-project-language-count-#{user.id}"
  end

  def user_project_language_count 
    $redis_cache.hgetall(user_project_language_count_key).transform_values(&:to_i)
  end

  def set_user_project_language_count 
    if $redis_cache.hlen(user_project_language_count_key) == 0
      reset_user_project_language_count
    elsif $redis_cache.hget(user_project_language_count_key, key).nil?
      reset_user_project_language_count_by_key
    else 
      $redis_cache.hincrby(user_project_language_count_key, key, increment_count) 
    end
  end

  def reset_user_project_language_count_by_key
    return if user.nil?
    return if key.nil?
    $redis_cache.hset(user_project_language_count_key, key, user.projects.joins(:project_language).where(project_languages: {name: key}).count) 
  end

  def reset_user_project_language_count
    return if user.nil?
    user.projects.joins(:project_language).group("project_languages.name").count.each do |k, v|
      $redis_cache.hset(user_project_language_count_key, k, v)
    end
  end
end