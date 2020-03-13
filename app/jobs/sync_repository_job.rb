class SyncRepositoryJob < ApplicationJob
  queue_as :default

  def perform(login,identifier)
    Rails.logger.info("#######__________begin_sync_repository_________####")
    gitea_test_ssh = "sshpass -p '@pd:lk4+407' ssh -o StrictHostKeyChecking=no -p 30122 root@123.59.135.93"
    gitea_jump_ssh = "sshpass -p '#pd:lk3+407' ssh -o StrictHostKeyChecking=no -p 30122 root@10.9.69.134"
    gitea_user_repo = "/home/git/gitea-repositories/#{login}"
    git_clone_bare = "git clone --bare http://git.trustie.net/#{login}/#{identifier}.git"

    gitea_repos = system("#{gitea_test_ssh} && #{gitea_jump_ssh} && cd #{gitea_user_repo} && rm -rf #{identifier}.git && #{git_clone_bare}")

    if gitea_repos
      Rails.logger.info("########________gitea_clone_success__________##############")
    else
      Rails.logger.info("########________gitea_clone_failed_____user_loigin:_#{login}_identifier:__#{identifier}")
    end

  end
end