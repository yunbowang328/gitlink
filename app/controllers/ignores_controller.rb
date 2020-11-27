class IgnoresController < ApplicationController
  def index
    #@ignores = Ignore.search(params[:name]).without_content
    q = Ignore.ransack(name_cont: params[:name])
    @ignores = q.result(distinct: true)
  end
end
