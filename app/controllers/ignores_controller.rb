class IgnoresController < ApplicationController
  def index
    @ignores = Ignore.search(params[:name]).without_content
  end
end
