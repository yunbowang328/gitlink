class SyncMirroredRepositoryJob < ApplicationJob
  queue_as :default

  def perform(repo_id, user_id)
    repo = Repository.find_by(id: repo_id)
    current_user = User.find_by(id: user_id)
    return if repo.blank? || current_user.blank?
    result = Gitea::Repository::SyncMirroredService.new(repo.user.login, repo.identifier, token: current_user.gitea_token).call
    repo&.mirror&.set_status! if result[:status] === 200 && repo&.mirror
  end
end
