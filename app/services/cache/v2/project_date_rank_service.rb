class Cache::V2::ProjectDateRankService < ApplicationService 
  attr_reader :project_id, :rank_date, :visits, :praises, :forks, :issues, :pullrequests
  attr_accessor :project_common

  def initialize(project_id, rank_date=Date.today, params={})
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

  private 
  def project_rank_key
    "v2-project-rank-#{rank_date.to_s}"
  end

  def project_rank
    $redis_cache.zscore(project_rank_key, @project_id)
  end

  def set_project_rank
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
end