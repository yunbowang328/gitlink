class Organizations::BaseController < ApplicationController
  include ApplicationHelper

  def load_organization
    @organization = Organization.find_by(login: params[:id]) || Organization.find_by(id: params[:id])

    render_not_found if @organization.nil?

    @organization
  end
end