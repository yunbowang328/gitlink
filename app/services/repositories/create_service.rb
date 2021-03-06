class Repositories::CreateService < ApplicationService
  attr_reader :user, :project, :params
  attr_accessor :repository, :gitea_repository

  def initialize(user, project, params)
    @project = project
    @user    = user
    @params  = params
  end

  def call
    @repository = Repository.new(repository_params)
    ActiveRecord::Base.transaction do
      if repository.save!
        create_gitea_repository
        sync_project
        sync_repository
        @project.set_owner_permission(user)
        # if project.project_type == "common"
        #   chain_params = {
        #     type: "create",
        #     chain_params:{
        #       username: user.try(:login),
        #       reponame: @repository.try(:identifier),
        #       token_name: @repository.try(:identifier),
        #       total_supply: 1000000
        #     }
        #   }
        #   PostChainJob.perform_later(chain_params)  #创建上链操作
        # end
      else
        Rails.logger.info("#############___________create_repository_erros______###########{@repository.errors.messages}")
      end
      repository
    end
  rescue => e
    puts "create repository service error: #{e.message}"
    raise Error, e.message
  end

  private

  def create_gitea_repository
    if project.owner.is_a?(User)
      @gitea_repository = Gitea::Repository::CreateService.new(user.gitea_token, gitea_repository_params).call
    elsif project.owner.is_a?(Organization)
      @gitea_repository = Gitea::Organization::Repository::CreateService.call(user.gitea_token, project.owner.login, gitea_repository_params)
    end
  end

  def sync_project
    if gitea_repository
      project.update_columns(
        gpid: gitea_repository["id"],
        identifier: repository.identifier,
        default_branch: gitea_repository["default_branch"],
        forked_count: gitea_repository["forks_count"])
    end
  end

  def sync_repository
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
