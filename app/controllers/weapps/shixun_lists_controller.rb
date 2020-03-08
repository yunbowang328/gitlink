class Weapps::ShixunListsController < ApplicationController

  def index
    results = Weapps::ShixunSearchService.call(search_params, current_laboratory)
    @total_count = results.size
    @results = paginate results
  end

  private

  def search_params
    params.permit(:keyword, :type, :page, :limit, :order, :status, :diff, :sort, :no_jupyter)
  end
end