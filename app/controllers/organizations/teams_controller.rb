class Organizations::TeamsController < Organizations::BaseController
  before_action :load_organization
  before_action :load_team, only: [:show, :update, :destroy]
  before_action :check_user_can_edit_org, only: [:create, :update, :destroy]

  def index
    if @organization.is_owner?(current_user) || current_user.admin?
      @teams = @organization.teams
    else
      @teams = @organization.teams.joins(:team_users).where(team_users: {user_id: current_user.id})
    end
    @is_admin = can_edit_org?
    @teams = @teams.includes(:team_units, :team_users)

    @teams = kaminari_paginate(@teams)
  end

  def show
    @is_admin = can_edit_org?
    @is_member = @team.is_member?(current_user.id)
  end

  def create
    @team = Organizations::Teams::CreateService.call(current_user, @organization, team_params)
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  def update
    @team = Organizations::Teams::UpdateService.call(current_user, @team, team_params)
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  def destroy
    tip_exception("组织团队不允许被删除") if @team.owner?
    ActiveRecord::Base.transaction do
      Gitea::Organization::Team::DeleteService.call(@organization.gitea_token, @team.gtid)
      @team.destroy!
    end
    render_ok
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  private
  def team_params
    params.permit(:name, :description, :authorize, :includes_all_project, :can_create_org_project, :unit_types => [])
  end

  def load_organization
    @organization = Organization.find_by(login: params[:organization_id]) || Organization.find_by(id: params[:organization_id])
    tip_exception("组织不存在") if @organization.nil?
    tip_exception("没有查看组织的权限") if org_limited_condition || org_privacy_condition
  end

  def load_team
    @team = Team.find_by_id(params[:id])
    tip_exception("组织团队不存在") if @team.nil?
    tip_exception("没有查看组织团队的权限") if team_not_found_condition
  end
end