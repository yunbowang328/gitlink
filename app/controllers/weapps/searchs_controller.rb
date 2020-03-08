class Weapps::SearchsController < Weapps::BaseController
  after_action :record_search_keyword, only: [:index]
  
  def index
    @results = Weapps::SearchQuery.call(search_params)
  end

  private

  def search_params
    params.permit(:keyword, :type, :page, :per_page)
  end
end