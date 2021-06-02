class Users::IsPinnedProjectsController < Users::BaseController 
  before_action :private_user_resources!, only: [:pin]
  def index 
    @is_pinned_projects = observed_user.pinned_projects.order(position: :desc, created_at: :asc).includes(project: [:project_category, :project_language, :repository]).order(position: :desc)
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

  def update 
    @pinned_project = PinnedProject.find_by_id(params[:id])
    @pinned_project.attributes = pinned_project_params 
    if @pinned_project.save 
      render_ok
    else 
      render_error
    end
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  private 
  def is_pinned_project_ids 
    if params[:is_pinned_project_ids].present?
      return params[:is_pinned_project_ids].select{|id| observed_user.full_member_projects.visible.pluck(:id).include?(id.to_i) }
    end
    if params[:is_pinned_project_id].present?
      return observed_user.is_pinned_project_ids unless observed_user.full_member_projects.visible.pluck(:id).include?(params[:is_pinned_project_id].to_i)
      return observed_user.is_pinned_project_ids.include?(params[:is_pinned_project_id].to_i) ? observed_user.is_pinned_project_ids : observed_user.is_pinned_project_ids.push(params[:is_pinned_project_id].to_i)
    end
  end
  
  def pinned_project_params
    params.require(:pinned_project).permit(:position)
  end
end