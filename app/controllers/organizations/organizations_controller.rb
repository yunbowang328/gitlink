class Organizations::OrganizationsController < Organizations::BaseController
  before_action :require_login, except: [:index, :show]
  before_action :convert_base64_image!, only: [:create, :update]
  before_action :load_organization, only: [:show, :update, :destroy]

  def index
    if current_user.logged?
      @organizations = Organization.with_visibility(%w(common limited)) +
          Organization.with_visibility("privacy").joins(:organization_users).where(organization_users: {user_id: current_user.id})
      kaminary_array_paginate(@organizations)
    else
      @organizations = Organization.with_visibility("common")
      kaminari_paginate(@organizations)
    end
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
      Gitea::Organization::UpdateService.call(current_user.gitea_token, login, @organization)
      Util.write_file(@image, avatar_path(@organization)) if params[:image].present?
    end
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  def destroy
    render_unauthorized unless current_user.check_password?(password)
    render_forbidden("您没有权限进行该操作") unless @organization.check_owner?(current_user)
    ActiveRecord::Base.transaction do
      Gitea::Organization::DeleteService.call(current_user.gitea_token, @organization.login)
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

end