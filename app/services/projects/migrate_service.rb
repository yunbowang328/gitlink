class Projects::MigrateService < ApplicationService
  attr_reader :user, :params
  attr_accessor :project

  def initialize(user, params)
    @user    = user
    @params  = params
  end

  def call
    @project = Project.new(project_params)
    if @project.save!
      ProjectUnit.init_types(@project.id)
      Project.update_mirror_projects_count!
      @project.set_owner_permission(user)
      Repositories::MigrateService.new(user, @project, repository_params).call
    else
      #
    end
    @project
  rescue => e
    puts "create mirror project service error: #{e.message}"
    raise Error, e.message
  end

  private

  def project_params
    {
      name: params[:name],
      user_id: params[:user_id],
      project_type: set_project_type,
      description: params[:description],
      identifier: params[:repository_name],
      is_public: project_secretion[:public],
      project_category_id: params[:project_category_id],
      project_language_id: params[:project_language_id],
    }
  end

  def set_project_type
    ActiveModel::Type::Boolean.new.cast(params[:is_mirror]) == true ? Project.project_types[:sync_mirror] : Project.project_types[:mirror]
  end

  def repository_params
    {
      hidden: project_secretion[:hidden],
      identifier: params[:repository_name],
      mirror_url: params[:clone_addr],
      user_id: params[:user_id],
      login: params[:auth_username],
      password: params[:auth_password],
      is_mirror: params[:is_mirror],
      source_clone_url: params[:source_clone_url]
    }
  end

  def project_secretion
    # 默认公开
    public, hidden = true, false
    public, hidden = false, true if ActiveModel::Type::Boolean.new.cast(params[:private]) == true

    { public: public, hidden: hidden }
  end
end
