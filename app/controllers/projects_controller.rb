class ProjectsController < ApplicationController
  include ApplicationHelper
  include OperateProjectAbilityAble
  before_action :require_login, except: %i[index branches group_type_list]
  before_action :find_project_with_id, only: %i[show branches update destroy]
  before_action :authorizate_user_can_edit_project!, only: %i[update]

  def index
    is_admin = current_user && current_user&.admin?

    scope = Projects::ListQuery.call(params.merge(is_admin: is_admin, user_id: current_user.try(:id)))

    @total_count = scope.size
    Rails.logger.info("######_____projects_ids____________##############{scope.pluck(:id)}")
    Rails.logger.info("######_____projects_u_ids____________##############{scope.pluck(:user_id)}")

    @projects = paginate(scope)
  end

  def create
    ActiveRecord::Base.transaction do
      Projects::CreateForm.new(project_params).validate!
      @project = Projects::CreateService.new(current_user, project_params).call
    end
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  def migrate
    ActiveRecord::Base.transaction do
      Projects::MigrateForm.new(mirror_params).validate!
      @project = Projects::MigrateService.new(current_user, mirror_params).call
    end
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  def branches
    @branches = Gitea::Repository::BranchesService.new(@project.owner, @project.identifier).call
  end

  def group_type_list
    # is_admin = current_user && current_user&.admin?
    # if is_admin
    #   projects = Project.all
    # elsif current_user&.logged?
    #
    #   projects = Project.list_user_projects(current_user.id)
    # else
    #   projects = Project.visible
    # end
    #
    if current_user&.logged?
      projects = Project.list_user_projects(current_user.id)
    else
      projects = Project.visible
    end
    # projects = Project.visible
    @project_group_list = projects.no_anomory_projects.group(:project_type).size
  end

  def update
    ActiveRecord::Base.transaction do
      # Projects::CreateForm.new(project_params).validate!
      private = params[:private]
      if [true, false].include? private
        new_project_params = project_params.merge(is_public: !private)
        Gitea::Repository::UpdateService.new(@project.owner, @project.repository.identifier, {private: private}).call
        @project.repository.update_column(:hidden, private)
      end
      @project.update_attributes!(new_project_params)
    end
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  def show
  end

  def destroy
    if  current_user.admin? ||  @project.owner?(current_user)
      ActiveRecord::Base.transaction do
        Gitea::Repository::DeleteService.new(@project.owner, @project.identifier).call
        @project.destroy!
        render_ok
      end
    else
      render_forbidden('你没有权限操作')
    end
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  private
  def project_params
    params.permit(:user_id, :name, :description, :repository_name,
                  :project_category_id, :project_language_id, :license_id, :ignore_id)
  end

  def mirror_params
    params.permit(:user_id, :name, :description, :repository_name,
                  :project_category_id, :project_language_id, :clone_addr, :private)
  end
end
