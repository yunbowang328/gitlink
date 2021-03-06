class Projects::CreateService < ApplicationService
  attr_reader :user, :params

  def initialize(user, params)
    @user    = user
    @params  = params
  end

  def call
    Rails.logger.info("#############__________project_params______###########{project_params}")
    raise Error, "user_id不正确." unless authroize_user_id_success

    @project = Project.new(project_params)
    ActiveRecord::Base.transaction do
      if @project.save!
        Project.update_common_projects_count!
        ProjectUnit.init_types(@project.id)
        Repositories::CreateService.new(user, @project, repository_params).call
      else
        Rails.logger.info("#############___________create_project_erros______###########{@project.errors.messages}")
      end
    end
    @project
  rescue => e
    puts "create project service error: #{e.message}"
    raise Error, e.message
  end

  private

  def authroize_user_id_success 
    (user.id == params[:user_id].to_i) || (user.organizations.find_by_id(params[:user_id]).present?)
  end

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
      website: params[:website],
      identifier: params[:repository_name]
    }
  end

  def repository_params
    {
      hidden: !repo_is_public,
      user_id: params[:user_id],
      identifier: params[:repository_name]
    }
  end

  # def get_is_public
  #   params[:private] || false
  # end

  def repo_is_public
    params[:private].blank? ? true : !params[:private]
  end
end
