class Users::IsPinnedProjectsController < Users::BaseController 
  before_action :private_user_resources!, only: [:pin]
  def index 
    @is_pinned_projects = observed_user.is_pinned_projects.includes(:project_category, :project_language, :repository).order(position: :desc)
    @is_pinned_projects = kaminari_paginate(@is_pinned_projects)
  end 
  
  def pin 
    observed_user.is_pinned_project_ids = is_pinned_project_ids
    render_ok
  rescue ActiveRecord::RecordNotFound => e
    render_not_found
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  private 
  def is_pinned_project_ids 
    if params[:is_pinned_project_ids].present?
      return params[:is_pinned_project_ids].select{|id| observed_user.full_member_projects.pluck(:id).include?(id.to_i) }
    end
    if params[:is_pinned_project_id].present?
      return observed_user.is_pinned_project_ids.include?(params[:is_pinned_project_id].to_i) ? observed_user.is_pinned_project_ids : observed_user.is_pinned_project_ids.push(params[:is_pinned_project_id].to_i)
    end
  end
end