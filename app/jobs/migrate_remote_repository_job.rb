class MigrateRemoteRepositoryJob < ApplicationJob
  queue_as :default

  def perform(repo_id, token, params)
    puts "############ perform: repo_id: #{repo_id}, token: #{token}, params: #{params}}"
    repo = Repository.find_by(id: repo_id)
    return if repo.blank?

    gitea_repository = Gitea::Repository::MigrateService.new(token, params).call
    if gitea_repository
      repo&.project&.update_columns(gpid: gitea_repository["id"])
      repo&.mirror&.update_columns(status: Mirror.statuses[:succeeded])
    end
  end
end
