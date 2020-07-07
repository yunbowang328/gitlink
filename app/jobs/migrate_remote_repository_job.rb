class MigrateRemoteRepositoryJob < ApplicationJob
  queue_as :default

  def perform(repo_id, token, params)
    repo = Repository.find_by(id: repo_id)
    return if repo.blank?

    puts "############ MigrateRemoteRepositoryJob starting ... ############"

    gitea_repository = Gitea::Repository::MigrateService.new(token, params).call
    if gitea_repository
      repo&.project&.update_columns(gpid: gitea_repository["id"])
      repo&.mirror&.succeeded!
      puts "############ mirror status: #{repo.mirror.status} ############"
    end
  end
end
