class ProjectTrendsController < ApplicationController
  before_action :load_repository
  before_action :check_project_public

  def index
    project_trends = @project.project_trends.preload(:user, trend: :user, project: :owner)

    check_time = params[:time]  #时间的筛选
    check_type = params[:type]   #动态类型的筛选，目前已知的有 Issue, PullRequest, Version
    check_status = params[:status]   #类型的选择 "create", "close", "journal",

    if check_time.present?
      check_time = check_time.to_i
      project_trends = project_trends.where("created_at between ? and ?",(Time.now.beginning_of_day - check_time.days), Time.now.end_of_day)
    end

    @project_close_issues_count = project_trends.where(trend_type: "Issue", action_type: "close").size
    @project_issues_count = project_trends.where(trend_type: "Issue", action_type: "create").size
    @project_open_issues_count = @project_issues_count - @project_close_issues_count

    @project_pr_count = project_trends.where(trend_type: "PullRequest", action_type: ["close", "merge"]).size
    @project_pr_all_count = project_trends.where(trend_type: "PullRequest", action_type: "create").size
    @project_new_pr_count = @project_pr_all_count - @project_pr_count
    if check_type.present?
      project_trends = project_trends.where(trend_type: check_type.to_s.strip)
    end

    if check_status.present?
      if check_status == "delay" || check_status == "close"
        project_trends = project_trends.where(action_type: ["close", "merge"])
      else 
        project_trends = project_trends.where(action_type: ["create"]).where.not(trend_id: project_trends.where(action_type: ["close", "merge"]).pluck(:trend_id)) 
      end
    else
      project_trends = project_trends.where(action_type: "create")
    end
    project_trends = project_trends.order("created_at desc")

    @page = params[:page]
    @limit = params[:limit] || 15
    @project_trends_size = project_trends.size
    @project_trends = project_trends.page(@page).per(@limit)
  end

  private

  def check_project_public
    unless @project.is_public || @project.member?(current_user) || current_user.admin?
      normal_status(-1, "您没有权限")
    end
  end
end
