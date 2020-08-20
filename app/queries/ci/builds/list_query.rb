class Ci::Builds::ListQuery < ApplicationQuery
  include CustomSortable

  attr_reader :params

  sort_columns :build_created, default_by: :build_created, default_direction: :desc

  def initialize(repo, params)
    @repo   = repo
    @params = params
  end

  def call
    course_lists = @repo.builds

    custom_sort(course_lists, params[:sort_by], params[:sort_direction])
  end
end
