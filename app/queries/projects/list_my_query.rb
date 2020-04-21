class Projects::ListMyQuery < ApplicationQuery

  attr_reader :params, :current_user

  # sort_columns :updated_on, :created_on, :forked_count, :praises_count, default_by: :updated_on, default_direction: :desc

  def initialize(params,current_user)
    @params = params
    @current_user = current_user
  end

  def call
    if params[:category].blank?
      projects = Project.joins(:members).where(members: { user_id: current_user.id })
    elsif params[:category].to_s == "manage"
      projects = Project.where(user_id: current_user.id)
    else
      projects = Project.where.not(user_id: current_user.id).joins(:members).where(members: { user_id: current_user.id })
    end
    unless params[:is_public].blank?
      projects = projects.where(is_public: (params[:is_public].to_s == "publicly"))
    end

    scope = projects.includes(:members,:issues,:project_category,:project_score, :project_language, owner: :user_extension)

    sort = params[:sort_by] || "updated_on"
    sort_direction = params[:sort_direction] || "desc"
    scope.order("projects.#{sort} #{sort_direction}")
  end
end
