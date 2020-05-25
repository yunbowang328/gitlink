class Projects::CreateService < ApplicationService
  attr_reader :user, :params

  def initialize(user, params)
    @user    = user
    @params  = params
  end

  def call
    @project = Project.new(project_params)
    ActiveRecord::Base.transaction do
      if @project.save!
        Repositories::CreateService.new(user, @project, repository_params).call
      else
        #
      end
    end
    @project
  rescue => e
    puts "create project service error: #{e.message}"
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
      is_public: repo_is_public,
      ignore_id: params[:ignore_id],
      license_id: params[:license_id],
      identifier: params[:repository_name]  #新增,hs
    }
  end

  def repository_params
    {
      hidden: get_is_public,
      user_id: params[:user_id],
      identifier: params[:repository_name]
    }
  end

  def get_is_public
    params[:private] || true
  end

  def repo_is_public
    !get_is_public
  end
end
