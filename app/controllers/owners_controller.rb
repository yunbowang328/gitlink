class OwnersController < ApplicationController
  before_action :require_login

  def index
    @owners = []
    @owners += [current_user]
    @owners += Organization.joins(team_users: :team)
                   .where(team_users: {user_id: current_user.id},
                          teams: {can_create_org_project: true})
                   .distinct
  end
end