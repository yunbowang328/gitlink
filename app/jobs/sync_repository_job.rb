class SyncRepositoryJob < ApplicationJob
  queue_as :default

  #同步 trustie的仓库

  def perform(user_login, identifier, repository_params, gitea_main)
    #创建临时文件夹 clone 并强推代码
    SyncLog.sync_log("=================begin to sync request trustie repository=====================")
    path = "#{Rails.root}/public/cache_repository"
    image_url = repository_params[:git_url]
    gitlab_branches = repository_params[:gitlab_branches]
    image_repo_name = image_url.to_s.split('/')&.last&.chomp('.git')

    unless File.directory?(path)
      FileUtils.mkdir_p(path)
    end

    if Dir.exist?("#{path}/#{image_repo_name}")
      system("rm -rf #{path}/#{image_repo_name}")
    end

    check_clone = system("cd #{path} && git clone #{image_url}")
    SyncLog.sync_log("========check_clone:====cd #{path} && git clone #{image_url}===================")
    SyncLog.sync_log("========gitlab_branches:#{gitlab_branches}===================")
    if check_clone
      new_gitlab_url = "http://root:_Trustie_10010@#{gitea_main}/#{user_login}/#{identifier}.git"
      shell_remote_1 = system("cd #{path}/#{image_repo_name} && git remote set-url origin #{new_gitlab_url}")
      gitlab_branches.each do |branch|
        SyncLog.sync_log("========checkout_branch:#{branch}===================")
        shell5 = system("cd #{path}/#{image_repo_name} && git checkout #{branch} && git push --force --set-upstream origin #{branch}")
        SyncLog.sync_log("========checkout_branch_shell5:#{shell5}===================")
        if !shell5
          SyncLog.sync_project_log("=============force_push_erros==#{path}/#{image_repo_name}++branch:#{branch}")
        else
          SyncLog.sync_project_log("=============force_push_success==#{path}/#{image_repo_name}++branch+++#{branch}")
        end
      end
    else
      SyncLog.sync_project_log("=============check_clone_erros==#{path}/#{image_repo_name}")
      SyncLog.sync_log("++++++++++++++++++check_clone_erros++++++++++++++++++#{image_repo_name}")
    end
    SyncLog.sync_log("=================end to sync repository=====================#{image_repo_name}")
  end
  
end