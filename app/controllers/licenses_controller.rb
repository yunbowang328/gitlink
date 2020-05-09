class LicensesController < ApplicationController
  def index
    #@licenses = License.search(params[:name]).
    q = License.ransack(name_cont: params[:name])
    @licenses = q.result(distinct: true)
  end
end
