class Organizations::BaseController < ApplicationController
  include ApplicationHelper

  protected

  def organization_owner
    @organization.team_users.joins(:team).where(teams: {authorize: 'owner'}).take.user
  end

  def org_limited_condition
    @organization.organization_extension.limited? && !current_user.logged?
  end

  def org_privacy_condition
    @organization.organization_extension.privacy? && @organization.organization_users.where(user_id: current_user.id).blank?
  end

  def team_not_found_condition
    @team.team_users.where(user_id: current_user.id).blank? && !@organization.is_owner?(current_user)
  end

  def user_mark
    params[:username] || params[:id]
  end
end