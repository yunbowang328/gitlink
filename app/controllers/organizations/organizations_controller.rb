class Organizations::OrganizationsController < Organizations::BaseController
  before_action :require_login, except: [:index, :show]
  before_action :convert_base64_image!, only: [:create, :update]
  before_action :load_organization, only: [:show, :update, :destroy]
  before_action :check_user_can_edit_org, only: [:update, :destroy]

  def index
    if current_user.logged?
      logged_organizations_sql = Organization.with_visibility(%w(common limited)).to_sql
      privacy_organizations_sql = Organization.with_visibility("privacy").joins(:organization_users).where(organization_users: {user_id: current_user.id}).to_sql
      @organizations = Organization.from("( #{ logged_organizations_sql } UNION #{ privacy_organizations_sql } ) AS users")
    else
      @organizations = Organization.with_visibility("common")
    end
    @organizations = @organizations.ransack(login_cont: params[:search]).result if params[:search].present?
    @organizations = @organizations.includes(:organization_extension).order("organization_extensions.#{sort_by} #{sort_direction}")
    @organizations = kaminari_paginate(@organizations)
  end

  def show
  end

  def create
    ActiveRecord::Base.transaction do
      @organization = Organizations::CreateService.call(current_user, organization_params)
      Util.write_file(@image, avatar_path(@organization)) if params[:image].present?
    end
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  def update
    ActiveRecord::Base.transaction do
      login = @organization.login
      @organization.update!(login: organization_params[:name]) if organization_params[:name].present?
      @organization.organization_extension.update_attributes!(organization_params.except(:name))
      Gitea::Organization::UpdateService.call(@organization.gitea_token, login, @organization.reload)
      Util.write_file(@image, avatar_path(@organization)) if params[:image].present?
    end
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  def destroy
    tip_exception("密码不正确") unless current_user.check_password?(password)
    ActiveRecord::Base.transaction do
      Gitea::Organization::DeleteService.call(@organization.gitea_token, @organization.login)
      @organization.destroy!
    end
    render_ok
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  private
  def convert_base64_image!
    max_size = EduSetting.get('upload_avatar_max_size')
    @image = Util.convert_base64_image(params[:image].to_s.strip, max_size: max_size)
  rescue Base64ImageConverter::Error => ex
    render_error(ex.message)
  end

  def avatar_path(organization)
    ApplicationController.helpers.disk_filename(organization.class, organization.id)
  end

  def organization_params
    params.permit(:name, :description, :website, :location,
                  :repo_admin_change_team_access, :visibility,
                  :max_repo_creation)
  end

  def password
    params.fetch(:password, "")
  end

  def load_organization
    @organization = Organization.find_by(login: params[:id]) || Organization.find_by(id: params[:id])
    tip_exception("组织不存在") if @organization.nil?
    tip_exception("没有查看组织的权限") if org_limited_condition || org_privacy_condition
  end

  def sort_by
    params.fetch(:sort_by, "created_at")
  end

  def sort_direction
    params.fetch(:sort_direction, "desc")
  end

end