class Cache::PlatformProjectLanguagesCountService < ApplicationService 
  attr_reader :key, :increment_count

  def initialize(key=nil, increment_count=0)
    @key = key
    @increment_count = increment_count
  end

  def call 
    set_platform_project_language_count

    platform_project_language_count
  end

  def reset_by_key
    reset_platform_project_language_count_by_key

    platform_project_language_count
  end

  def reset
    reset_platform_project_language_count

    platform_project_language_count
  end

  private 

  def platform_project_language_count_key 
    "platform-project-language-count"
  end

  def platform_project_language_count 
    $redis_cache.hgetall(platform_project_language_count_key).transform_values(&:to_i)
  end

  def set_platform_project_language_count 
    if $redis_cache.hlen(platform_project_language_count_key) == 0
      reset_platform_project_language_count
    elsif $redis_cache.hget(platform_project_language_count_key, key).nil?
      reset_platform_project_language_count_by_key
    else 
      $redis_cache.hincrby(platform_project_language_count_key, key, increment_count) 
    end
  end

  def reset_platform_project_language_count_by_key
    return if key.nil?
    $redis_cache.hset(platform_project_language_count_key, key, Project.joins(:project_language).where(project_languages: {name: key}).count) 
  end

  def reset_platform_project_language_count
    Project.joins(:project_language).group("project_languages.name").count.each do |k, v|
      $redis_cache.hset(platform_project_language_count_key, k, v)
    end
  end
end