class Organizations::BaseController < ApplicationController
  include ApplicationHelper

  def load_organization
    @organization = Organization.find_by(login: params[:id]) || Organization.find_by(id: params[:id])

    @organization = nil if limited_condition || privacy_condition

    render_not_found if @organization.nil?

    @organization
  end

  private
  def limited_condition
    @organization.organization_extension.limited? && !current_user.logged?
  end

  def privacy_condition
    @organization.organization_extension.privacy? && @organization.organization_users.where(user_id: current_user.id).blank?
  end
end