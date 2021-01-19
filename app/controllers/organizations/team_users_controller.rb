class Organizations::TeamUsersController < Organizations::BaseController
  before_action :load_organization, :load_team
  before_action :load_operate_user, only: [:create, :destroy]
  before_action :load_team_user, only: [:destroy]
  before_action :check_user_can_edit_org, only: [:create, :destroy]

  def index
    @team_users = @team.team_users

    @team_users = kaminari_paginate(@team_users)
  end

  def create
    ActiveRecord::Base.transaction do
      @team_user = TeamUser.build(@organization.id, @operate_user.id, @team.id)
      @organization_user = OrganizationUser.build(@organization.id, @operate_user.id)
      Gitea::Organization::TeamUser::CreateService.call(@organization.gitea_token, @team.gtid, @operate_user.login)
    end
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  def destroy
    tip_exception("您不能从 Owner 团队中删除最后一个用户") if @organization.is_owner_team_last_one?(@operate_user)
    ActiveRecord::Base.transaction do
      @team_user.destroy!
      Gitea::Organization::TeamUser::DeleteService.call(@organization.gitea_token, @team.gtid, @operate_user.login)
      render_ok
    end
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  def quit
    @team_user = @team.team_users.find_by(user_id: current_user.id)
    tip_exception("您不在该组织团队中") if @team_user.nil?
    tip_exception("您不能从 Owner 团队中删除最后一个用户") if @organization.is_owner_team_last_one?(current_user)
    ActiveRecord::Base.transaction do
      @team_user.destroy!
      Gitea::Organization::TeamUser::DeleteService.call(@organization.gitea_token, @team.gtid, current_user.login)
      render_ok
    end
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  private
  def load_organization
    @organization = Organization.find_by(login: params[:organization_id]) || Organization.find_by(id: params[:organization_id])
    tip_exception("组织不存在") if @organization.nil?
    tip_exception("没有查看组织的权限") if org_limited_condition || org_privacy_condition
  end

  def load_team
    @team = Team.find_by_id(params[:team_id])
    tip_exception("组织团队不存在") if @team.nil?
    tip_exception("没有查看组织团队的权限") if team_not_found_condition
  end

  def load_operate_user
    @operate_user = User.find_by(login: user_mark) if user_mark.present?
    tip_exception("平台用户不存在") if @operate_user.nil?
  end

  def load_team_user
    @team_user = TeamUser.find_by(team_id: @team.id, user_id: @operate_user.id)
    tip_exception("组织团队成员不存在") if @team_user.nil?
  end

end