class Projects::ListQuery < ApplicationQuery
  include CustomSortable

  attr_reader :params

  sort_columns :updated_on, :created_on, :forked_count, :praises_count, default_by: :updated_on, default_direction: :desc

  def initialize(params)
    @params = params
  end

  def call
    q = Project.secret_and_visible.by_name_or_identifier(params[:search])

    scope = q
      .with_project_type(params[:project_type])
      .with_project_category(params[:category_id])
      .with_project_language(params[:language_id]).order(order_index: :desc)

    sort = params[:sort_by] || "updated_on"
    sort_direction = params[:sort_direction] || "desc"

    custom_sort(scope, sort, sort_direction)

    # scope = scope.reorder("projects.#{sort} #{sort_direction}")
    # scope
  end
end
