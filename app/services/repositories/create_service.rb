class Repositories::CreateService < ApplicationService
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
        Rails.logger.info("#############__________gitea_repository_params______###########{gitea_repository_params}")
        gitea_repository = Gitea::Repository::CreateService.new(user.gitea_token, gitea_repository_params).call
        sync_project(@repository, gitea_repository)
        sync_repository(@repository, gitea_repository)
      else
        Rails.logger.info("#############___________create_repository_erros______###########{@repository.errors.messages}")
      end
      @repository
    end
  rescue => e
    puts "create repository service error: #{e.message}"
    raise Error, e.message
  end

  private

  def sync_project(repository, gitea_repository)
    if gitea_repository
      project.update_columns(
        gpid: gitea_repository["id"],
        identifier: repository.identifier,
        forked_count: gitea_repository["forks_count"])
    end
  end

  def sync_repository(repository, gitea_repository)
    repository.update_columns(url: remote_repository_url,) if gitea_repository
  end

  def remote_repository_url
    [Gitea.gitea_config[:domain], '/', user.login, '/', params[:identifier], ".git"].join("")
  end

  def repository_params
    params.merge(project_id: project.id)
  end

  def gitea_repository_params
    hash = {
      name: params[:identifier],
      private: params[:hidden],
      # readme: "ReadMe",
      "auto_init": true,
      # "description": "string",
      # "gitignores": "string",
      # "issue_labels": "string",
      # "license": "string",
      # "name": "string",
      # "private": true,
      # "readme": "string"
    }

    ignore  = project.ignore
    license = project.license
    hash = hash.merge(license: license.name) if license
    hash = hash.merge(gitignores: ignore.name) if ignore
    hash = hash.merge(auto_init: true) if ignore || license
    hash
  end
end
