class SearchsController < ApplicationController
  after_action :record_search_keyword, only: [:index]

  def index
    @results = SearchService.call(search_params)
  end

  private

  def search_params
    params.permit(:keyword, :type, :page, :per_page)
  end
end