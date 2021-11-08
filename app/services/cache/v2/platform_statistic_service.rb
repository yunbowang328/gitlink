class Cache::V2::PlatformStatisticService < ApplicationService 
  attr_reader :follow_count, :fork_count, :issue_count, :project_count, :project_language_count_key, :project_language_count, :project_praise_count, :project_watcher_count, :pullrequest_count

  def initialize(params={})
    @follow_count = params[:follow_count]
    @fork_count = params[:fork_count]
    @issue_count = params[:issue_count]
    @project_count = params[:project_count]
    @project_language_count_key = params[:project_language_count_key]
    @project_language_count = params[:project_language_count]
    @project_praise_count = params[:project_praise_count]
    @project_watcher_count = params[:project_watcher_count]
    @pullrequest_count = params[:pullrequest_count]
  end

  def read 
    platform_statistic
  end

  def call 
    set_platform_statistic
  end

  def reset 
    reset_platform_statistic
  end

  private 

  def platform_statistic_key
    "v2-platform-statistic"
  end

  def follow_count_key 
    "follow-count"
  end

  def fork_count_key
    "fork-count"
  end

  def issue_count_key 
    "issue-count"
  end

  def project_count_key 
    "project-count"
  end

  def project_language_key 
    "project-language"
  end

  def project_praise_count_key 
    "project-praise-count"
  end

  def project_watcher_count_key 
    "project-watcher-count"
  end

  def pullrequest_count_key
    "pullrequest-count"
  end

  def platform_statistic
    result = $redis_cache.hgetall(platform_statistic_key)

    result.blank? ? reset_platform_statistic : result
  end

  def set_platform_statistic
    if $redis_cache.hgetall(platform_statistic_key).blank?
      reset_platform_statistic
      return
    end
    if @follow_count.present?
      if $redis_cache.hget(platform_statistic_key, follow_count_key).nil?
        reset_platform_follow_count
      else
        $redis_cache.hincrby(platform_statistic_key, follow_count_key, @follow_count) 
      end
    end
    if @fork_count.present?
      if $redis_cache.hget(platform_statistic_key, fork_count_key).nil?
        reset_platform_fork_count
      else
        $redis_cache.hincrby(platform_statistic_key, fork_count_key, @fork_count) 
      end
    end
    if @issue_count.present?
      if $redis_cache.hget(platform_statistic_key, issue_count_key).nil?
        reset_platform_issue_count
      else
        $redis_cache.hincrby(platform_statistic_key, issue_count_key, @issue_count) 
      end
    end
    if @project_count.present?
      if $redis_cache.hget(platform_statistic_key, project_count_key).nil?
        reset_platform_project_count
      else
        $redis_cache.hincrby(platform_statistic_key, project_count_key, @project_count) 
      end
    end
    if @project_language_count_key.present? && project_language_count.present?
      if $redis_cache.hget(platform_statistic_key, project_language_key).nil?
        reset_platform_project_language
      else
        result = JSON.parse($redis_cache.hget(platform_statistic_key, project_language_key))
        result[@project_language_count_key] ||= 0
        result[@project_language_count_key] += project_language_count.to_i
        $redis_cache.hset(platform_statistic_key, project_language_key, result.to_json) 
      end
    end
    if @project_praise_count.present?
      if $redis_cache.hget(platform_statistic_key, project_praise_count_key).nil?
        reset_platform_project_praise_count
      else
        $redis_cache.hincrby(platform_statistic_key, project_praise_count_key, @project_praise_count) 
      end
    end
    if @project_watcher_count.present?
      if $redis_cache.hget(platform_statistic_key, project_watcher_count_key).nil?
        reset_platform_project_watcher_count
      else
        $redis_cache.hincrby(platform_statistic_key, project_watcher_count_key, @project_watcher_count) 
      end
    end
    if @pullrequest_count.present?
      if $redis_cache.hget(platform_statistic_key, pullrequest_count_key).nil?
        reset_platform_pullrequest_count
      else
        $redis_cache.hincrby(platform_statistic_key, pullrequest_count_key, @pullrequest_count) 
      end
    end
    $redis_cache.hgetall(platform_statistic_key)
  end

  def reset_platform_follow_count 
    $redis_cache.hset(platform_statistic_key, follow_count_key, Watcher.where(watchable_type: 'User').count)
  end

  def reset_platform_fork_count
    $redis_cache.hset(platform_statistic_key, fork_count_key, ForkUser.count)
  end

  def reset_platform_issue_count
    $redis_cache.hset(platform_statistic_key, issue_count_key, Issue.count)
  end

  def reset_platform_project_count
    $redis_cache.hset(platform_statistic_key, project_count_key, Project.count)
  end

  def reset_platform_project_language
    $redis_cache.hset(platform_statistic_key, project_language_key, ProjectLanguage.where.not(projects_count: 0).group("project_languages.name").sum(:projects_count).to_json)
  end

  def reset_platform_project_praise_count
    $redis_cache.hset(platform_statistic_key, project_praise_count_key, PraiseTread.where(praise_tread_object_type: "Project").count)
  end

  def reset_platform_project_watcher_count
    $redis_cache.hset(platform_statistic_key, project_watcher_count_key, Watcher.where(watchable_type: 'Project').count)
  end

  def reset_platform_pullrequest_count
    $redis_cache.hset(platform_statistic_key, pullrequest_count_key, PullRequest.count)
  end

  def reset_platform_statistic
    $redis_cache.del(platform_statistic_key)
    reset_platform_follow_count
    reset_platform_fork_count
    reset_platform_issue_count
    reset_platform_project_count
    reset_platform_project_language
    reset_platform_project_praise_count
    reset_platform_project_watcher_count
    reset_platform_pullrequest_count

    $redis_cache.hgetall(platform_statistic_key)
  end
end