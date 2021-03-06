class ProjectsController < ApplicationController
  include ApplicationHelper
  include OperateProjectAbilityAble
  include ProjectsHelper
  include Acceleratorable

  before_action :require_login, except: %i[index branches branches_slice group_type_list simple show fork_users praise_users watch_users recommend banner_recommend about menu_list]
  before_action :require_profile_completed, only: [:create, :migrate]
  before_action :load_repository, except: %i[index group_type_list migrate create recommend banner_recommend]
  before_action :authorizate_user_can_edit_project!, only: %i[update]
  before_action :project_public?, only: %i[fork_users praise_users watch_users]

  def menu_list
    menu = []

    menu.append(menu_hash_by_name("home"))
    menu.append(menu_hash_by_name("code")) if @project.has_menu_permission("code")
    menu.append(menu_hash_by_name("issues")) if @project.has_menu_permission("issues")
    menu.append(menu_hash_by_name("pulls")) if @project.has_menu_permission("pulls")
    menu.append(menu_hash_by_name("wiki")) if @project.has_menu_permission("wiki")
    menu.append(menu_hash_by_name("devops")) if @project.has_menu_permission("devops")
    menu.append(menu_hash_by_name("versions")) if @project.has_menu_permission("versions")
    menu.append(menu_hash_by_name("resources")) if @project.has_menu_permission("resources")
    menu.append(menu_hash_by_name("activity"))
    menu.append(menu_hash_by_name("settings")) if current_user.admin? || @project.manager?(current_user)

    render json: menu
  end

  def index
    scope = current_user.logged? ? Projects::ListQuery.call(params, current_user.id) : Projects::ListQuery.call(params)

    @projects = kaminari_paginate(scope.includes(:project_category, :project_language, :repository, :project_educoder, :owner, :project_units))
    # @projects = paginate scope.includes(:project_category, :project_language, :repository, :project_educoder, :owner, :project_units)

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

    @project = 
      if enable_accelerator?(mirror_params[:clone_addr])
        source_clone_url = mirror_params[:clone_addr]
        uid_logger("########## ??????????????? ##########")
        result = Gitea::Accelerator::MigrateService.call(mirror_params)
        if result[:status] == :success
          Rails.logger.info "########## ?????????????????? ########## "
          Projects::MigrateService.call(current_user, 
            mirror_params.merge(source_clone_url: source_clone_url, 
              clone_addr: accelerator_url(mirror_params[:repository_name])))
        else
          Projects::MigrateService.call(current_user, mirror_params)
        end
      else
        Projects::MigrateService.call(current_user, mirror_params)
      end
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  def branches
    return @branches = [] unless @project.forge?

    result = Gitea::Repository::Branches::ListService.call(@owner, @project.identifier)
    @branches =  result.is_a?(Hash) && result.key?(:status) ? [] : result
  end

  def branches_slice
    return @branches = [] unless @project.forge?

    slice_result = Gitea::Repository::Branches::ListSliceService.call(@owner, @project.identifier)
    @branches_slice = slice_result.is_a?(Hash) && slice_result.key?(:status) ? [] : slice_result
  end

  def group_type_list
    project_statics = ProjectStatistic.first

    @project_statics_list = [
      {
        project_type: 'common',
        name: '??????????????????',
        projects_count: project_statics&.common_projects_count || 0
      },
      {
        project_type: 'mirror',
        name: '??????????????????',
        projects_count: project_statics&.mirror_projects_count || 0
      }
    ]

    # projects = Project.no_anomory_projects.visible
    # @project_group_list = projects.group(:project_type).size
  end

  def update
    ActiveRecord::Base.transaction do
      # TODO:
      # ????????????????????????website???lesson_url????????????
      if project_params.has_key?("website") 
        @project.update(project_params)
      elsif project_params.has_key?("default_branch")
        @project.update(project_params)
        gitea_params = {
          default_branch: @project.default_branch
        }
        Gitea::Repository::UpdateService.call(@owner, @project.identifier, gitea_params)
      else
        validate_params = project_params.slice(:name, :description, 
          :project_category_id, :project_language_id, :private, :identifier)
  
        Projects::UpdateForm.new(validate_params.merge(user_id: @project.user_id, project_identifier: @project.identifier)).validate!
  
        private = @project.forked_from_project.present? ? !@project.forked_from_project.is_public : params[:private] || false

        new_project_params = project_params.except(:private).merge(is_public: !private)
        @project.update_attributes!(new_project_params)
        @project.forked_projects.update_all(is_public: @project.is_public)
        gitea_params = {
          private: private,
          default_branch: @project.default_branch,
          website: @project.website,
          name: @project.identifier
        }
        gitea_repo = Gitea::Repository::UpdateService.call(@owner, @project&.repository&.identifier, gitea_params)
        @project.repository.update_attributes({hidden: gitea_repo["private"], identifier: gitea_repo["name"]})
      end
      SendTemplateMessageJob.perform_later('ProjectSettingChanged', current_user.id, @project&.id, @project.previous_changes.slice(:name, :description, :project_category_id, :project_language_id, :is_public, :identifier)) if Site.has_notice_menu?
    end
  rescue Exception => e
    uid_logger_error(e.message)
    tip_exception(e.message)
  end

  def show
  end

  def destroy
    if current_user.admin? || @project.manager?(current_user)
      ActiveRecord::Base.transaction do
        Gitea::Repository::DeleteService.new(@project.owner, @project.identifier).call
        @project.destroy!
        @project.forked_projects.update_all(forked_from_project_id: nil)
        render_ok
      end
    else
      render_forbidden('?????????????????????')
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
    # ??????????????????????????????????????????????????????
    Cache::V2::ProjectCommonService.new(@project.id).read
    json_response(@project, current_user)
  end

  def recommend
    @projects = Project.recommend.includes(:repository, :project_category, :owner).order(visits: :desc)
  end

  def banner_recommend
    @projects = Project.recommend.where.not(recommend_index: 0).includes(:project_category, :owner, :project_language).order(recommend_index: :desc)
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
    params.permit(:user_id, :name, :description, :repository_name, :website, :lesson_url, :default_branch, :identifier,
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
      render_forbidden('?????????????????????.')
    else
      render_unauthorized('???????????????.')
    end
  end
end
