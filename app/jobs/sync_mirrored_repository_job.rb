class SyncMirroredRepositoryJob < ApplicationJob
  queue_as :default

  def perform(repo_id, user_id)
    repo = Repository.find_by(id: repo_id)
    current_user = User.find_by(id: user_id)
    return if repo.blank? || current_user.blank?

    # TODO
    # 先同步镜像库
    if repo.config_accelerator?
      puts "[gitea-accelerator]: ###### 镜像库开始同步 ######"
      result = Gitea::Accelerator::SyncMirroredService.call(repo.identifier)
      puts "[gitea-accelerator]: ###### 镜像库同步状态为 #{result[:status]}"

      # TODO 暂时解决从镜像库镜像动作时间先执行的问题
      # 避免了Gitea::Repository::SyncMirroredService先执行后，加速器Gitea::Accelerator::SyncMirroredService
      # 再执行的导致Gitea::Repository::SyncMirroredService执行镜像不是最新代码的问题
      sleep 3.seconds
    end

    sync_common!(repo, current_user)
  end

  def sync_common!(repo, user)
    result = Gitea::Repository::SyncMirroredService.call(repo.owner.login,
      repo.identifier, token: user.gitea_token)
    repo&.mirror.set_status! if result[:status] === 200
    BroadcastMirrorRepoMsgJob.perform_later(repo.id) unless repo&.mirror.waiting?
  end

end
