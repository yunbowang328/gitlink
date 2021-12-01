class Projects::ListQuery < ApplicationQuery
  include CustomSortable

  attr_reader :params, :current_user_id

  sort_columns :updated_on, :created_on, :forked_count, :praises_count, default_by: :updated_on, default_direction: :desc

  def initialize(params, current_user_id=nil)
    @params = params
    @current_user_id = current_user_id
  end

  def call
    collection = Project.all
    collection = filter_projects(collection)

    sort = params[:sort_by] || "updated_on"
    sort_direction = params[:sort_direction] || "desc"

    custom_sort(collection, sort, sort_direction)

    # scope = scope.reorder("projects.#{sort} #{sort_direction}")
    # scope
  end

  def filter_projects(collection)
    # collection = by_pinned(collection)
    collection = by_search(collection)
    collection = by_project_type(collection)
    collection = by_project_category(collection)
    collection = by_project_language(collection)
    collection 
  end

  def by_search(items)
    items.visible.by_name_or_identifier(params[:search])
  end
  
  def by_project_type(items)
    items.with_project_type(params[:project_type])
  end

  def by_project_category(items)
    items.with_project_category(params[:category_id])
  end

  def by_project_language(items)
    items.with_project_language(params[:language_id])
  end
  
  def by_pinned(items)
    (params[:pinned].present? && params[:category_id].present?) ? items.pinned : items
  end
  
end
