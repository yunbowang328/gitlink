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

    builds =
      case params[:search]
      when 'success' then scope.successed
      when 'pending' then scope.pending
      when 'error' then scope.errored
      when 'running' then scope.running
      when 'failure' then scope.failed
      else
        scope
      end
    custom_sort(builds, params[:sort_by], params[:sort_direction])
  end
end
