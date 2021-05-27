class Users::ProjectTrendsController < Users::BaseController 

  def index 
    if params[:date].present?
      @project_trends = observed_user.project_trends.where("DATE(created_at) = ?", params[:date])
    else 
      @project_trends = observed_user.project_trends
    end
    @project_trends = kaminari_paginate(@project_trends.includes(:trend, :project).order(created_at: :desc))
  end
end