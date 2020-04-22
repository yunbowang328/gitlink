class Projects::ListQuery < ApplicationQuery
  include CustomSortable

  attr_reader :params

  sort_columns :updated_on, :created_on, :forked_count, :praises_count, default_by: :updated_on, default_direction: :desc

  def initialize(params)
    @params = params
  end

  def call
    # if params[:is_admin]
    #   projects = Project.all
    # elsif params[:user_id].to_i != 2
    #   projects = Project.list_user_projects(params[:user_id])
    # else
    #   projects = Project.visible
    # end

    if params[:user_id].to_i != 2 && params[:user_id].to_i != 0
      projects = Project.list_user_projects(params[:user_id])
    else
      projects = Project.visible    #匿名用户的项目
    end
    scope = projects.no_anomory_projects.includes(:project_category, :project_language, :repository, owner: :user_extension).like(params[:search])
      .with_project_type(params[:project_type])
      .with_project_category(params[:category_id])
      .with_project_language(params[:language_id])

    sort = params[:sort_by] || "updated_on"
    sort_direction = params[:sort_direction] || "desc"
    scope = scope.order("projects.#{sort} #{sort_direction}")
    scope
    # custom_sort(scope, params[:sort_by], params[:sort_direction])
  end
end
