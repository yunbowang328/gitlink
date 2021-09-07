class Projects::ListQuery < ApplicationQuery
  include CustomSortable

  attr_reader :params, :current_user_id

  sort_columns :updated_on, :created_on, :forked_count, :praises_count, default_by: :updated_on, default_direction: :desc

  def initialize(params, current_user_id=nil)
    @params = params
    @current_user_id = current_user_id
  end

  def call
    q = Project.all_visible(current_user_id).by_name_or_identifier(params[:search])

    scope = q
      .with_project_type(params[:project_type])
      .with_project_category(params[:category_id])
      .with_project_language(params[:language_id])

    sort = params[:sort_by] || "updated_on"
    sort_direction = params[:sort_direction] || "desc"

    custom_sort(scope, sort, sort_direction)

    # scope = scope.reorder("projects.#{sort} #{sort_direction}")
    # scope
  end
end
