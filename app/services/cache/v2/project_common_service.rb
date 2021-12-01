class Cache::V2::ProjectCommonService < ApplicationService 
  attr_reader :project_id, :owner_id, :name, :identifier, :description, :visits, :watchers, :praises, :forks, :issues, :pullrequests
  attr_accessor :project

  def initialize(project_id, params={})
    @project_id = project_id
    @owner_id = params[:owner_id]
    @name = params[:name]
    @identifier = params[:identifier]
    @description = params[:description]
    @visits = params[:visits]
    @watchers = params[:watchers]
    @praises = params[:praises]
    @forks = params[:forks]
    @issues = params[:issues]
    @pullrequests = params[:pullrequests]
  end

  def read 
    project_common
  end

  def call 
    set_project_common
  end

  def reset 
    reset_project_common
  end

  def clear 
    clear_project_common
  end

  private 
  def load_project
    @project = Project.find_by_id(project_id)
  end

  def project_common_key
    "v2-project-common:#{@project_id}"
  end

  def owner_id_key 
    "owner_id"
  end

  def name_key
    "name"
  end

  def identifier_key
    "identifier"
  end

  def description_key 
    "description"
  end

  def visits_key 
    "visits"
  end

  def watchers_key 
    "watchers"
  end

  def praises_key 
    "praises"
  end

  def forks_key 
    "forks"
  end

  def issues_key
    "issues"
  end

  def pullrequests_key 
    "pullrequests"
  end

  def project_common
    result = $redis_cache.hgetall(project_common_key)
    result.blank? ? reset_project_common : result
  end

  def set_project_common
    if $redis_cache.hgetall(project_common_key).blank?
      reset_project_common
      return
    else
      load_project
      return unless @project.is_full_public
      if @owner_id.present?
        if $redis_cache.hget(project_common_key, owner_id_key).nil?
          reset_project_owner_id
        else
          $redis_cache.hset(project_common_key, owner_id_key, @owner_id) 
        end
      end
      if @name.present?
        if $redis_cache.hget(project_common_key, name_key).nil?
          reset_project_name
        else
          $redis_cache.hset(project_common_key, name_key, @name) 
        end
      end
      if @identifier.present?
        if $redis_cache.hget(project_common_key, identifier_key).nil?
          reset_project_identifier
        else
          $redis_cache.hset(project_common_key, identifier_key, @identifier) 
        end
      end
      if @description.present?
        if $redis_cache.hget(project_common_key, description_key).nil?
          reset_project_description
        else
          $redis_cache.hset(project_common_key, description_key, @description) 
        end
      end
      if @visits.present?
        $redis_cache.hincrby(project_common_key, visits_key, @visits.to_s) 
        Cache::V2::ProjectRankService.call(@project_id, {visits: @visits})
        Cache::V2::ProjectDateRankService.call(@project_id, Date.today, {visits: @visits})
      end
      if @watchers.present?
        $redis_cache.hincrby(project_common_key, watchers_key, @watchers) 
      end
      if @praises.present?
        $redis_cache.hincrby(project_common_key, praises_key, @praises) 
          Cache::V2::ProjectRankService.call(@project_id, {praises: @praises})
          Cache::V2::ProjectDateRankService.call(@project_id, Date.today, {praises: @praises})
      end
      if @forks.present?
        $redis_cache.hincrby(project_common_key, forks_key, @forks) 
        Cache::V2::ProjectRankService.call(@project_id, {forks: @forks})
        Cache::V2::ProjectDateRankService.call(@project_id, Date.today, {forks: @forks})
      end
      if @issues.present?
        $redis_cache.hincrby(project_common_key, issues_key, @issues) 
        Cache::V2::ProjectRankService.call(@project_id, {issues: @issues})
        Cache::V2::ProjectDateRankService.call(@project_id, Date.today, {issues: @issues})
      end
      if @pullrequests.present?
        $redis_cache.hincrby(project_common_key, pullrequests_key, @pullrequests) 
        Cache::V2::ProjectRankService.call(@project_id, {pullrequests: @pullrequests})
        Cache::V2::ProjectDateRankService.call(@project_id, Date.today, {pullrequests: @pullrequests})
      end
    end
    
    $redis_cache.hgetall(project_common_key)
  end
  
  def reset_project_owner_id
    $redis_cache.hset(project_common_key, owner_id_key, @project&.user_id)
  end

  def reset_project_name
    $redis_cache.hset(project_common_key, name_key, @project&.name)
  end

  def reset_project_identifier
    $redis_cache.hset(project_common_key, identifier_key, @project&.identifier)
  end

  def reset_project_description
    $redis_cache.hset(project_common_key, description_key, @project&.description)
  end

  def reset_project_visits
    $redis_cache.hset(project_common_key, visits_key, @project&.visits || 0)
  end

  def reset_project_watchers
    $redis_cache.hset(project_common_key, watchers_key, Watcher.where(watchable_type: 'Project', watchable_id: @project_id).count)
  end

  def reset_project_praises
    $redis_cache.hset(project_common_key, praises_key,  PraiseTread.where(praise_tread_object_type: 'Project', praise_tread_object_id: @project_id).count)
  end

  def reset_project_forks
    $redis_cache.hset(project_common_key, forks_key, ForkUser.where(project_id: @project_id).count)
  end

  def reset_project_issues
    $redis_cache.hset(project_common_key, issues_key, Issue.issue_issue.where(project_id: @project_id).count)
  end

  def reset_project_pullrequests
    $redis_cache.hset(project_common_key, pullrequests_key, PullRequest.where(project_id: @project_id).count)
  end

  def reset_project_common
    load_project
    return unless @project.present?
    return unless @project.is_full_public
    $redis_cache.del(project_common_key)
    reset_project_owner_id
    reset_project_name
    reset_project_identifier
    reset_project_description
    reset_project_visits
    reset_project_watchers
    reset_project_praises
    reset_project_forks
    reset_project_issues
    reset_project_pullrequests

    $redis_cache.hgetall(project_common_key)
  end

  def clear_project_common
    $redis_cache.del(project_common_key)
    Cache::V2::ProjectRankService.new(@project_id).clear
  end
end