class Organizations::OrganizationUsersController < Organizations::BaseController
  before_action :load_organization
  before_action :load_operate_user, :load_organization_user, :check_user_can_edit_org, only: [:destroy]

  def index
    @organization_users = @organization.organization_users.includes(:user)
    search = params[:search].to_s.downcase
    @organization_users = @organization_users.joins(:user).where("LOWER(CONCAT_WS(users.lastname, users.firstname, users.login, users.mail, users.nickname)) LIKE ?", "%#{search.split(" ").join('|')}%") if search.present?

    @organization_users = kaminari_paginate(@organization_users)
  end

  def destroy
    tip_exception("您不能从所有者团队中删除最后一个用户") if @organization.is_owner_team_last_one?(@operate_user.id)
    ActiveRecord::Base.transaction do
      @organization_user.destroy!
      TeamUser.where(organization_id: @organization.id, user_id: @operate_user.id).map{|u| u.destroy!}
      Gitea::Organization::OrganizationUser::DeleteService.call(@organization.gitea_token, @organization.login, @operate_user.login)
      render_ok
    end
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  def quit
    @organization_user = @organization.organization_users.find_by(user_id: current_user.id)
    tip_exception("您不在该组织中") if @organization_user.nil?
    tip_exception("您不能从所有者团队中删除最后一个用户") if @organization.is_owner_team_last_one?(current_user.id)
    ActiveRecord::Base.transaction do
      @organization_user.destroy!
      TeamUser.where(organization_id: @organization.id, user_id: current_user.id).map{|u| u.destroy!}
      Gitea::Organization::OrganizationUser::DeleteService.call(@organization.gitea_token, @organization.login, current_user.login)
      render_ok
    end
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  private
  def load_organization
    @organization = Organization.find_by(login: params[:organization_id]) || Organization.find_by(id: params[:organization_id])
    return render_not_found("组织不存在") if @organization.nil?
    return render_forbidden("没有查看组织的权限") if org_limited_condition || org_privacy_condition
  end

  def load_operate_user
    @operate_user = User.find_by(login: user_mark) if user_mark.present?
    tip_exception("平台用户不存在") if @operate_user.nil?
  end

  def load_organization_user
    @organization_user = OrganizationUser.find_by(organization_id: @organization.id, user_id: @operate_user.id)
    tip_exception("组织成员不存在") if @organization_user.nil?
  end
end