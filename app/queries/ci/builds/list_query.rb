class Ci::Builds::ListQuery < ApplicationQuery
  include CustomSortable

  attr_reader :params

  sort_columns :build_created, default_by: :build_created, default_direction: :desc

  def initialize(repo, params)
    @repo   = repo
    @params = params
  end

  def call
    scope = @repo.builds

    scope =
      case params[:search]
      when 'success'
        scope.successed
      when 'pending'
        scope.pending
      when 'error'
        scope.errored
      when 'running'
        scope.running
      when 'failure'
        scope.failed
      else
        scope
      end
    custom_sort(scope, params[:sort_by], params[:sort_direction])
  end
end
