class Projects::ListQuery < ApplicationQuery
  include CustomSortable

  attr_reader :params

  sort_columns :updated_on, :created_on, :forked_count, :praises_count, default_by: :updated_on, default_direction: :desc

  def initialize(params)
    @params = params
  end

  def call
    scope = Project.visible.like(params[:search])
      .with_project_type(params[:project_type])
      .with_project_category(params[:category_id])
      .with_project_language(params[:language_id])
      .includes(:project_category, :project_language, :owner)

    custom_sort(scope, params[:sort_by], params[:sort_direction])
  end
end
