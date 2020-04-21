class Projects::ListMyQuery < ApplicationQuery

  attr_reader :params

  # sort_columns :updated_on, :created_on, :forked_count, :praises_count, default_by: :updated_on, default_direction: :desc

  def initialize(params)
    @params = params
  end

  def call
    if params[:user_id].to_i == 2 || params[:user_id].to_i == 0
      return nil
    else
      if params[:joins].present?
        projects = Project.where.not(user_id: params[:user_id]).joins(:members).where("members.user_id = ?", params[:user_id])
      else
        projects = Project.where(user_id: params[:user_id])
      end
      scope = projects.includes(:members,:issues,:project_category, :project_language, owner: :user_extension).like(params[:search])
                .with_project_type(params[:project_type])
                .with_project_category(params[:category_id])
                .with_project_language(params[:language_id])

      sort = params[:sort_by] || "updated_on"
      sort_direction = params[:sort_direction] || "desc"
      scope.order("projects.#{sort} #{sort_direction}")
    end


  end
end
