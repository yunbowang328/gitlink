class Projects::MigrateService < ApplicationService
  attr_reader :user, :params

  def initialize(user, params)
    @user    = user
    @params  = params
  end

  def call
    @project = Project.new(project_params)
    ActiveRecord::Base.transaction do
      if @project.save!
        Repositories::MigrateService.new(user, @project, repository_params).call
      else
        #
      end
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
      description: params[:description],
      project_category_id: params[:project_category_id],
      project_language_id: params[:project_language_id],
      is_public: project_secretion[:public],
      project_type: Project.project_types[:mirror]
    }
  end

  def repository_params
    {
      hidden: project_secretion[:hidden],
      identifier: params[:repository_name],
      mirror_url: params[:clone_addr],
      user_id: user.id,
      login: user.login
    }
  end

  def project_secretion
    # 默认公开
    public, hidden = true, false
    public, hidden = false, true if ActiveModel::Type::Boolean.new.cast(params[:private]) == true

    { public: public, hidden: hidden }
  end
end
