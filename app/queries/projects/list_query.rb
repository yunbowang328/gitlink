class Projects::ListQuery < ApplicationQuery
  include CustomSortable

  attr_reader :params

  sort_columns :updated_on, :created_on, :forked_count, :praises_count, default_by: :updated_on, default_direction: :desc

  def initialize(params)
    @params = params
  end

  def call
    if params[:is_admin]
      projects = Project.all
    elsif params[:user_id].to_i != 2
      projects = Project.list_user_projects(params[:user_id])
    else
      projects = Project.visible
    end
    scope = projects.includes(:repository, owner: :user_extension).like(params[:search])
      .with_project_type(params[:project_type])
      .with_project_category(params[:category_id])
      .with_project_language(params[:language_id])
      .includes(:project_category, :project_language, :owner)

    custom_sort(scope, params[:sort_by], params[:sort_direction])
  end
end
