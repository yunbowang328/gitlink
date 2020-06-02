class MigrateRemoteRepositoryJob < ApplicationJob
  queue_as :default

  def perform(repo_id, token, params)
    repo = Repository.find_by(id: repo_id)
    return if repo.blank?

    gitea_repository = Gitea::Repository::MigrateService.new(token, params).call
    sync_project(repo, gitea_repository)
    sync_repository(repo, gitea_repository)
  end

  private
  def sync_project(repo, gitea_repository)
    repo&.project.update_columns(gpid: gitea_repository["id"], identifier: gitea_repository["name"]) if gitea_repository
  end

  def sync_repository(repository, gitea_repository)
    repository.mirror.update_columns(statuses: Mirror.statuses[:succeeded]) if gitea_repository
  end
end
