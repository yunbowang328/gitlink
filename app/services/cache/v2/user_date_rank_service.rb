class Cache::V2::UserDateRankService < ApplicationService 
  attr_reader :user_id, :rank_date, :follow_count, :fork_count, :issue_count, :project_count, :project_language_count_key, :project_language_count, :project_praise_count, :project_watcher_count, :pullrequest_count

  def initialize(user_id, rank_date=Date.today, params={})
    @user_id = user_id
    @rank_date = rank_date
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

  def read_rank
    user_rank
  end

  def read_statistic
    user_statistic
  end

  def call 
    set_user_rank
  end

  private 
  def user_rank_key
    "v2-user-rank-#{@rank_date.to_s}"
  end

  def user_date_statistic_key 
    "v2-user-statistic:#{@user_id}-#{@rank_date.to_s}"
  end

  def user_rank
    $redis_cache.zscore(user_rank_key, @user_id)
  end

  def user_statistic 
    $redis_cache.hgetall(user_date_statistic_key)
  end

  def set_user_statistic
    if @follow_count.present?
      $redis_cache.hincrby(user_date_statistic_key, "follow-count", @follow_count.to_i) 
    end
    if @fork_count.present?
      $redis_cache.hincrby(user_date_statistic_key, "fork-count", @fork_count.to_i) 
    end
    if @issue_count.present?
      $redis_cache.hincrby(user_date_statistic_key, "issue-count", @issue_count.to_i) 
    end
    if @project_count.present?
      $redis_cache.hincrby(user_date_statistic_key, "project-count", @project_count.to_i) 
    end
    if project_language_count_key.present? && project_language_count.present?
      if $redis_cache.hget(user_date_statistic_key, "project-language").nil?
        result = {}
        result[@project_language_count_key] = project_language_count.to_i
        result.delete(@project_language_count_key) if result[@project_language_count_key] == 0
        $redis_cache.hset(user_date_statistic_key, "project-language", result.to_json)
      else
        result = JSON.parse($redis_cache.hget(user_date_statistic_key, "project-language"))
        result[@project_language_count_key] ||= 0
        result[@project_language_count_key] += project_language_count.to_i
        result.delete(@project_language_count_key) if result[@project_language_count_key] == 0
        $redis_cache.hset(user_date_statistic_key, "project-language", result.to_json) 
      end
    end
    if @project_praise_count.present?
      $redis_cache.hincrby(user_date_statistic_key, "project-praise-count", @project_praise_count.to_i) 
    end
    if @project_watcher_count.present?
      $redis_cache.hincrby(user_date_statistic_key, "project-watcher-count", @project_watcher_count.to_i) 
    end
    if @pullrequest_count.present?
      $redis_cache.hincrby(user_date_statistic_key, "pullrequest-count", @pullrequest_count.to_i) 
    end

    $redis_cache.hgetall(user_date_statistic_key)
  end

  def set_user_rank
    set_user_statistic
    follow_count = $redis_cache.hget(user_date_statistic_key, "follow-count") || 0
    pullrequest_count = $redis_cache.hget(user_date_statistic_key, "pullrequest-count") || 0
    issues_count = $redis_cache.hget(user_date_statistic_key, "issue-count") || 0
    project_count = $redis_cache.hget(user_date_statistic_key, "project-count") || 0
    fork_count = $redis_cache.hget(user_date_statistic_key, "fork-count") || 0
    project_watchers_count = $redis_cache.hget(user_date_statistic_key, "project-watcher-count") || 0
    project_praises_count = $redis_cache.hget(user_date_statistic_key, "project-praise-count") || 0
    project_language = $redis_cache.hget(user_date_statistic_key, "project-language") 
    project_languages_count = project_language.nil? || project_language == "{}" ? 0 : JSON.parse(project_language).length
    # 影响力
    influence = (60.0 + follow_count.to_i / (follow_count.to_i + 20.0) * 40.0).to_i 

    # 贡献度
    contribution = (60.0 + pullrequest_count.to_i / (pullrequest_count.to_i + 20.0) * 40.0).to_i

    # 活跃度
    activity = (60.0 + issues_count.to_i / (issues_count.to_i + 80.0) * 40.0).to_i

    # 项目经验
    experience = 10 * project_count.to_i + 5 * fork_count.to_i + project_watchers_count.to_i + project_praises_count.to_i 
    experience = (60.0 + experience / (experience + 100.0) * 40.0).to_i
    # 语言能力
    language = (60.0 + project_languages_count.to_i / (project_languages_count.to_i + 5.0) * 40.0).to_i

    score = influence+ contribution + activity + experience + language
    $redis_cache.zrem(user_rank_key, @user_id)
    $redis_cache.zadd(user_rank_key, score-300, @user_id) if score > 300

    $redis_cache.zscore(user_rank_key, @user_id)
  end
end