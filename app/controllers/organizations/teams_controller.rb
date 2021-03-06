class Organizations::TeamsController < Organizations::BaseController
  before_action :load_organization
  before_action :load_team, only: [:show, :update, :destroy]
  before_action :check_user_can_edit_org, only: [:create, :update, :destroy]

  def index
    #if @organization.is_owner?(current_user) || current_user.admin?
      @teams = @organization.teams
    #else
    #  @teams = @organization.teams.joins(:team_users).where(team_users: {user_id: current_user.id})
    #end
    @is_admin = can_edit_org?
    @teams = @teams.includes(:team_units, :team_users)

    @teams = kaminari_paginate(@teams)
  end

  def search
    tip_exception("请输入搜索关键词") if params[:search].nil?
    if @organization.is_owner?(current_user) || current_user.admin?
      @teams = @organization.teams
    else
      @teams = @organization.teams.joins(:team_users).where(team_users: {user_id: current_user.id})
    end
    @is_admin = can_edit_org?
    @teams  = @teams.ransack(name_cont: params[:search]).result if params[:search].present?
    @teams = @teams.includes(:team_units, :team_users)
  end

  def show
    @is_admin = can_edit_org?
    @is_member = @team.is_member?(current_user.id)
  end

  def create
    ActiveRecord::Base.transaction do
      Organizations::CreateTeamForm.new(team_params).validate!
      @team = Organizations::Teams::CreateService.call(current_user, @organization, team_params)
    end
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  def update
    Organizations::CreateTeamForm.new(team_params).validate!
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
    params.permit(:name, :nickname, :description, :authorize, :includes_all_project, :can_create_org_project, :unit_types => [])
  end

  def load_organization
    @organization = Organization.find_by(login: params[:organization_id]) || Organization.find_by(id: params[:organization_id])
    return render_not_found("组织不存在") if @organization.nil?
    return render_forbidden("没有查看组织的权限") if org_limited_condition || org_privacy_condition
  end

  def load_team
    @team = Team.find_by_id(params[:id])
    return render_not_found("组织团队不存在") if @team.nil?
    return render_forbidden("没有查看组织团队的权限") if team_not_found_condition
  end
end