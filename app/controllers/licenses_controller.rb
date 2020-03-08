class LicensesController < ApplicationController
  def index
    @licenses = License.search(params[:name]).without_content
  end
end
