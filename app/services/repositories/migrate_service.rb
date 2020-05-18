class Repositories::MigrateService < ApplicationService
  attr_reader :user, :project, :params

  def initialize(user, project, params)
    @project = project
    @user    = user
    @params  = params
  end

  def call
    @repository = Repository.new(repository_params)
    ActiveRecord::Base.transaction do
      if @repository.save!
        @repository.set_mirror! if wrapper_mirror
        MigrateRemoteRepositoryJob.perform_later(@repository, user.gitea_token, gitea_repository_params)
      end
      @repository
    end
  rescue => e
    puts "create mirror repository service error: #{e.message}"
    raise Error, e.message
  end

  private
  def repository_params
    params.merge(project_id: project.id)
  end

  def gitea_repository_params
    {
      clone_addr: params[:mirror_url],
      repo_name: params[:identifier],
      uid: user.gitea_uid,
      private: params[:hidden],
      mirror: wrapper_mirror || false,
      auth_username: params[:login],
      auth_password: params[:password]
    }
  end

  def wrapper_mirror
    ActiveModel::Type::Boolean.new.cast(params[:is_mirror])
  end
end
