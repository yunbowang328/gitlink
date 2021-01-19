class Organizations::BaseController < ApplicationController
  include ApplicationHelper
  include PaginateHelper

  protected

  def can_edit_org?
    current_user.admin? || @organization.is_owner?(current_user.id)
  end

  def check_user_can_edit_org
    tip_exception("您没有权限进行该操作") unless can_edit_org?
  end

  def org_limited_condition
    @organization.organization_extension.limited? && !current_user.logged?
  end

  def org_privacy_condition
    @organization.organization_extension.privacy? && @organization.organization_users.where(user_id: current_user.id).blank?
  end

  def team_not_found_condition
    @team.team_users.where(user_id: current_user.id).blank? && !@organization.is_owner?(current_user.id)
  end

  def user_mark
    params[:username] || params[:id]
  end
end