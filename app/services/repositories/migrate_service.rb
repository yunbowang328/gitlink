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
        gitea_repository = Gitea::Repository::MigrateService.new(user.gitea_token, gitea_repository_params).call
        sync_project(gitea_repository)
        sync_repository(@repository, gitea_repository)
      end
      @repository
    end
  rescue => e
    puts "create mirror repository service error: #{e.message}"
    raise Error, e.message
  end

  private

  def sync_project(gitea_repository)
    project.update_columns(gpid: gitea_repository["id"], identifier: gitea_repository["name"]) if gitea_repository
  end

  def sync_repository(repository, gitea_repository)
    repository.update_columns(url: gitea_repository["clone_url"]) if gitea_repository
  end

  def repository_params
    params.merge(project_id: project.id)
  end

  def gitea_repository_params
    {
      clone_addr: params[:mirror_url],
      repo_name: params[:identifier],
      uid: user.gitea_uid,
      private: params[:hidden]
    }
  end
end
