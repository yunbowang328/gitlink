class SyncMirroredRepositoryJob < ApplicationJob
  queue_as :default

  def perform(repo, current_user)
    result = Gitea::Repository::SyncMirroredService.new(repo.user.login, repo.identifier, token: current_user.gitea_token).call
    repo&.mirror.set_status! if result[:status] === 200
  end
end
