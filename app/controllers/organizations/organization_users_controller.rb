class Organizations::OrganizationUsersController < Organizations::BaseController
  before_action :load_organization
  before_action :load_operate_user, only: [:destroy]
  before_action :load_organization_user, only: [:destroy]

  def index
    @organization_users = @organization.organization_users.includes(:user)

    @organization_users = kaminari_paginate(@organization_users)
  end

  def destroy
    tip_exception("您没有权限进行该操作") unless @organization.is_owner?(current_user)
    ActiveRecord::Base.transaction do
      @organization_user.destroy!
      TeamUser.where(organization_id: @organization.id, user_id: @operate_user.id).map{|u| u.destroy!}
      Gitea::Organization::OrganizationUser::DeleteService.call(current_user.gitea_token, @organization.login, @operate_user.login)
      render_ok
    end
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  def quit
    @organization_user = @organization.organization_users.find_by(user_id: current_user.id)
    tip_exception("您不在该组织中") if @organization_user.nil?
    ActiveRecord::Base.transaction do
      @organization_user.destroy!
      TeamUser.where(organization_id: @organization.id, user_id: current_user.id).map{|u| u.destroy!}
      Gitea::Organization::OrganizationUser::DeleteService.call(organization_owner.gitea_token, @organization.login, current_user.login)
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

  def load_operate_user
    @operate_user = User.find_by(login: user_mark) if user_mark.present?
    tip_exception("平台用户不存在") if @operate_user.nil?
  end

  def load_organization_user
    @organization_user = OrganizationUser.find_by(organization_id: @organization.id, user_id: @operate_user.id)
    tip_exception("组织成员不存在") if @organization_user.nil?
  end
end