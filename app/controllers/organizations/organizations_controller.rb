class Organizations::OrganizationsController < Organizations::BaseController
  before_action :require_login, except: [:index, :show, :recommend]
  before_action :require_profile_completed, only: [:create]
  before_action :convert_image!, only: [:create, :update]
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
    @can_create_project = @organization.can_create_project?(current_user.id)
    @is_admin = can_edit_org?
    @is_member = @organization.is_member?(current_user.id)
    Cache::V2::OwnerCommonService.new(@organization.id).read
  end

  def create
    ActiveRecord::Base.transaction do
      tip_exception("无法使用以下关键词：#{organization_params[:name]}，请重新命名") if ReversedKeyword.check_exists?(organization_params[:name])
      Organizations::CreateForm.new(organization_params.merge(original_name: "")).validate!
      @organization = Organizations::CreateService.call(current_user, organization_params)
      Util.write_file(@image, avatar_path(@organization)) if params[:image].present?
    end
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  def update
    ActiveRecord::Base.transaction do
      Organizations::CreateForm.new(organization_params.merge(original_name: @organization.login)).validate!
      login = @organization.login
      @organization.login = organization_params[:name] if organization_params[:name].present?
      @organization.nickname = organization_params[:nickname] if organization_params[:nickname].present?
      @organization.save!
      sync_organization_extension!
      
      Gitea::Organization::UpdateService.call(current_user.gitea_token, login, @organization.reload)
      Util.write_file(@image, avatar_path(@organization)) if params[:image].present?
    end
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  def destroy
    tip_exception("密码不正确") unless current_user.check_password?(password)
    ActiveRecord::Base.transaction do
      gitea_destroy = Gitea::Organization::DeleteService.call(current_user.gitea_token, @organization.login)
      if gitea_destroy[:status] == 204 
        @organization.destroy!
        render_ok
      elsif gitea_destroy[:status] == 500
        tip_exception("当组织内含有仓库时，无法删除此组织")
      else
        tip_exception("")
      end
    end
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  def recommend
    recommend = %W(xuos Huawei_Technology openatom_foundation pkecosystem TensorLayer)
    
    @organizations = Organization.includes(:organization_extension).where(organization_extensions: {recommend: true}).to_a.each_slice(group_size).to_a
  end

  private

  def organization_params
    params.permit(:name, :description, :website, :location,
                  :repo_admin_change_team_access, :visibility,
                  :max_repo_creation, :nickname)
  end

  def group_size 
    params.fetch(:group_size, 4).to_i
  end

  def password
    params.fetch(:password, "")
  end

  def load_organization
    @organization = Organization.find_by(login: params[:id]) || Organization.find_by(id: params[:id])
    return render_not_found("组织不存在") if @organization.nil?
    return render_forbidden("没有查看组织的权限") if org_limited_condition || org_privacy_condition
  end

  def sort_by
    OrganizationExtension.column_names.include?(params[:sort_by]) ? params[:sort_by] : 'created_at'
  end

  def sort_direction
    %w(desc asc).include?(params[:sort_direction]) ? params[:sort_direction] : 'desc'
  end

  def set_max_repo_creation
    organization_params[:max_repo_creation].blank? ? -1 : organization_params[:max_repo_creation]
  end

  def organization_extension_params
    organization_params
    .except(:name, :nickname)
    .merge(max_repo_creation: set_max_repo_creation)
  end
  
  def sync_organization_extension!
    @organization.organization_extension.update_attributes!(organization_extension_params)
  end
  
end