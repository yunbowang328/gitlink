class TemplatesController < ApplicationController
  def show
    @template = EcTemplate.find_by_name!(params[:name])
  end
end