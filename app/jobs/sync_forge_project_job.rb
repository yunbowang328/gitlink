class SyncForgeProjectJob < ApplicationJob
  queue_as :default

  def perform(sync_parmas)
    sync_parmas.permit!
    Rails.logger.info("=======begin to sync forge projects, and sync_parmas: #{sync_parmas}")
    get_rand_user = rand_user
    project_params = sync_parmas[:project]
    repository_params = sync_parmas[:repository]
    project_socre_params = sync_parmas[:project_socre]
    begin
      unless Project.select(:identifier,:user_id).exists?(identifier: project_params[:identifier], user_id: get_rand_user.id)
        project_params = project_params.merge({user_id: get_rand_user.id })
        project = Project.new(project_params)
        if project.save 
          repository = Repository.new(repository_params.merge({ project_id: project.id, user_id: get_rand_user.id, login: get_rand_user.login }))
          if repository.save   # 同步镜像
            repository.sync_mirror!
            SyncMirroredRepositoryJob.perform_later(repository.id, get_rand_user.id)
          end
          project_score = ProjectScore.new(project_socre_params.merge({project_id: project.id}))
          project_score.save
        end
      end
      Rails.logger.info("=======end to sync forge projects")
    rescue => e
      Rails.logger.info("=======sync forge projects has errors: #{e}")
    end
  end

  private 

  def rand_user 
    user_ids = User.select(:id, :type).where(type: "User").pluck(:id)
    range_user_id = user_ids[rand(user_ids.length-1)]
    rand_sync_user = User.select(:id, :login).find_by_id(range_user_id)  #生成随机用户
    unless rand_sync_user.present?
      rand_user
    end
    rand_sync_user
  end
end
