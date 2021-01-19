class ProjectsController < ApplicationController
  include ApplicationHelper
  include OperateProjectAbilityAble
  include ProjectsHelper
  before_action :require_login, except: %i[index branches group_type_list simple show fork_users praise_users watch_users recommend about]
  before_action :load_project, except: %i[index group_type_list migrate create recommend]
  before_action :authorizate_user_can_edit_project!, only: %i[update]
  before_action :project_public?, only: %i[fork_users praise_users watch_users]

  def index
    scope = Projects::ListQuery.call(params)

    # @projects = kaminari_paginate(scope)
    @projects = paginate scope.includes(:project_category, :project_language, :repository, :project_educoder, owner: :user_extension)

    category_id = params[:category_id]
    @total_count =
      if category_id.blank?
        ps = ProjectStatistic.first
        ps.common_projects_count + ps.mirror_projects_count unless ps.blank?
      else
        cate = ProjectCategory.find_by(id: category_id)
        cate&.projects_count || 0
      end
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
    @branches = @project.forge? ? Gitea::Repository::Branches::ListService.new(@owner, @project.identifier).call : []
  end

  def group_type_list
    project_statics = ProjectStatistic.first

    @project_statics_list = [
      {
        project_type: 'common',
        name: '开源托管项目',
        projects_count: project_statics&.common_projects_count || 0
      },
      {
        project_type: 'mirror',
        name: '开源镜像项目',
        projects_count: project_statics&.mirror_projects_count || 0
      }
    ]

    # projects = Project.no_anomory_projects.visible
    # @project_group_list = projects.group(:project_type).size
  end

  def update
    ActiveRecord::Base.transaction do
      # Projects::CreateForm.new(project_params).validate!
      private = params[:private]
      gitea_params = {
        private: private,
        default_branch: params[:default_branch]
      }
      if [true, false].include? private
        new_project_params = project_params.merge(is_public: !private)
        Gitea::Repository::UpdateService.call(@owner, @project.identifier, gitea_params)
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
    fork_users = @project.fork_users.includes(:user, :project, :fork_project).order("fork_users.created_at desc").distinct
    @forks_count = fork_users.size
    @fork_users = paginate(fork_users)
  end

  def simple
    json_response(@project, current_user)
  end

  def recommend
    @projects = Project.recommend.includes(:repository, :project_category, owner: :user_extension).limit(5)
  end

  def about
    @project_detail = @project.project_detail
    @attachments = Array(@project_detail&.attachments) if request.get?
    ActiveRecord::Base.transaction do
      if request.post?
        require_login
        authorizate_user_can_edit_project!
        unless @project_detail.present?
          @project_detail = ProjectDetail.new(
            content: params[:content],
            project_id: @project.id)
        else
          @project_detail.content = params[:content]
        end
        if @project_detail.save!
          attachment_ids = Array(params[:attachment_ids])
          logger.info "=============> #{Array(params[:attachment_ids])}"
          @attachments =  Attachment.where(id: attachment_ids)
          @attachments.update_all(
            container_id: @project_detail.id,
            container_type: @project_detail.model_name.name,
            author_id: current_user.id,
            description: "")
        end
      end
    end
  end


  private
  def project_params
    params.permit(:user_id, :name, :description, :repository_name,
                  :project_category_id, :project_language_id, :license_id, :ignore_id, :private)
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
