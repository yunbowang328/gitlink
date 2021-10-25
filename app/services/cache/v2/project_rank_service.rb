class Cache::V2::ProjectRankService < ApplicationService 
  attr_reader :project_id, :visits, :praises, :forks, :issues, :pullrequests
  attr_accessor :project_common

  def initialize(project_id, params={})
    @project_id = project_id
    @visits = params[:visits]
    @praises = params[:praises]
    @forks = params[:forks]
    @issues = params[:issues]
    @pullrequests = params[:pullrequests]
  end

  def read 
    project_rank
  end

  def call 
    set_project_rank
  end

  def reset 
    reset_project_rank
  end

  private 
  def load_project_common
    @project_common = Cache::V2::ProjectCommonService.new(@project_id).read
  end

  def project_rank_key
    "v2-project-rank"
  end

  def project_rank
    $redis_cache.zscore(project_rank_key, @project_id).blank? ? reset_project_rank : $redis_cache.zscore(project_rank_key, @project_id)
  end

  def set_project_rank
    if $redis_cache.zscore(project_rank_key, @project_id).blank?
      reset_project_rank
      return
    end
    if @visits.present?
      $redis_cache.zincrby(project_rank_key, @visits.to_i * 1, @project_id) 
    end
    if @praises.present?
      $redis_cache.zincrby(project_rank_key, @praises.to_i * 5, @project_id) 
    end
    if @forks.present?
      $redis_cache.zincrby(project_rank_key, @forks.to_i * 5, @project_id) 
    end
    if @issues.present?
      $redis_cache.zincrby(project_rank_key, @issues.to_i * 10, @project_id) 
    end
    if @pullrequests.present?
      $redis_cache.zincrby(project_rank_key, @pullrequests.to_i * 10, @project_id) 
    end

    $redis_cache.zscore(project_rank_key, @project_id)
  end

  def reset_project_rank
    load_project_common
    $redis_cache.zrem(project_rank_key, @project_id)
    score = @project_common["visits"].to_i * 1 + @project_common["praises"].to_i * 5 + @project_common["forks"].to_i * 5 + @project_common["issues"].to_i * 10 + @project_common["pullrequests"].to_i * 10
    $redis_cache.zincrby(project_rank_key, score, @project_id) 

    $redis_cache.zscore(project_rank_key, @project_id)
  end
end