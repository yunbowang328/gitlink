class ProjectsController < ApplicationController
  include ApplicationHelper
  include OperateProjectAbilityAble
  include ProjectsHelper
  before_action :require_login, except: %i[index branches group_type_list simple]
  before_action :find_project_with_id, only: %i[show branches update destroy fork_users praise_users watch_users]
  before_action :authorizate_user_can_edit_project!, only: %i[update]
  before_action :project_public?, only: %i[fork_users praise_users watch_users]

  def index
    scope = Projects::ListQuery.call(params)

    @projects = kaminari_paginate(scope)
    @total_count = @projects.total_count
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
    Projects::MigrateForm.new(mirror_params).validate!
    @project = Projects::MigrateService.new(current_user, mirror_params).call
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  def branches
    @branches = Gitea::Repository::Branches::ListService.new(@project.owner, @project.identifier).call
  end

  def group_type_list
    # if current_user&.logged?
    #   projects = Project.list_user_projects(current_user.id)
    # else
    #   projects = Project.visible
    # end
    projects = Project.no_anomory_projects.visible
    @project_group_list = projects.group(:project_type).size
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

  def watch_users
    watchers = @project.watchers.includes(:user).order("watchers.created_at desc").distinct
    @watchers_count = watchers.size
    @watchers = paginate(watchers)
  end

  def praise_users
    praises = @project.praise_treads.includes(:user).order("praise_treads.created_at desc").distinct
    @praises_count = praises.size
    @praises = paginate(praises)
  end

  def fork_users
    fork_users = @project.fork_users.includes(:user, :project).order("fork_users.created_at desc").distinct
    @forks_count = fork_users.size
    @fork_users = paginate(fork_users)
  end

  def simple
    project = Project.includes(:owner, :repository).select(:id, :name, :identifier, :user_id, :project_type, :open_devops).find params[:id]
    json_response(project)
  end

  private
  def project_params
    params.permit(:user_id, :name, :description, :repository_name,
                  :project_category_id, :project_language_id, :license_id, :ignore_id)
  end

  def mirror_params
    params.permit(:user_id, :name, :description, :repository_name, :is_mirror, :auth_username,
                  :auth_password, :project_category_id, :project_language_id, :clone_addr, :private)
  end

  def project_public?
    return if @project.is_public?

    if current_user
      return if current_user.admin? || @project.member?(current_user.id)
      render_forbidden('你没有权限访问.')
    else
      render_unauthorized('你还未登录.')
    end
  end
end
