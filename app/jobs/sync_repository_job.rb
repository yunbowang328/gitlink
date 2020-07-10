class SyncRepositoryJob < ApplicationJob
  queue_as :default

  #同步 trustie的仓库

  def perform(repository, repository_params, gitea_main)
    #创建临时文件夹 clone 并强推代码
    SyncLog.sync_log("=================begin to sync request trustie repository=====================")
    path = "#{Rails.root}/public/cache_repository"
    unless File.directory?(path)
      FileUtils.mkdir_p(path)
    end
    image_url = repository_params[:url]
    g_default_branch = repository_params[:default_branch]
    image_repo_name = image_url.to_s.split('/')&.last&.chomp('.git')
    check_clone = system("cd #{path} and git clone #{image_url}")


    if check_clone
      new_gitlab_url = "http://root:_Trustie_10010@#{gitea_main}/#{repository.user.login}/#{repository.identifier}.git"

      shell_remote_1 = system("cd #{path}/#{image_repo_name} && git remote set-url origin #{new_gitlab_url}")
      
      shell5 = system("cd #{path}/#{image_repo_name} && git checkout #{g_default_branch} && git push --force --set-upstream origin #{g_default_branch}")
      if !shell5
        SyncLog.sync_log("++++++++++++++++++force_push_erros++++++++++++++++++##{path}/#{image_repo_name}++++++new_gitlab_url+++#{new_gitlab_url}")
      end
    else
      SyncLog.sync_log("++++++++++++++++++check_clone_erros++++++++++++++++++#{image_repo_name}")
    end
    SyncLog.sync_log("=================end to sync repository=====================#{image_repo_name}")
  end
  
end