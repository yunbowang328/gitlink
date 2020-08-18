class SyncForgeProjectJob < ApplicationJob
  queue_as :default

  def perform(sync_parmas)
    # sync_parmas.permit!
    Rails.logger.info("=======begin to sync forge projects, and sync_parmas: #{sync_parmas}")
    get_rand_user = rand_user
    project_params = sync_parmas[:project]
    repository_params = sync_parmas[:repository]
    project_socre_params = sync_parmas[:project_socre]
    begin
      unless Project.select(:identifier).exists?(identifier: project_params[:identifier])
        project_params = project_params.merge({user_id: get_rand_user.id })
        project = Project.new(project_params)
        if project.save 
          repository_params = {
            hidden: false,
            identifier: repository_params[:identifier],
            mirror_url: repository_params[:url].to_s.gsub("https://gitea.", "https://git."),
            user_id: get_rand_user.id,
            login: get_rand_user.login,
            password: "",
            is_mirror: false
          }
          Repositories::MigrateService.new(get_rand_user, project, repository_params).call
          project_score = ProjectScore.new(project_socre_params.merge({project_id: project.id}))
          project_score.save
        end
      end
      Rails.logger.info("=======end to sync forge projects")
    rescue => e
      Rails.logger.info("=======sync forge projects has errors: #{e}")
      raise ActiveRecord::Rollback
    end
  end

  private 

  def rand_user 
    user_ids = User.select(:id, :type, :gitea_token, :gitea_uid).where("gitea_token is not null and gitea_uid is not null and type = ?", "User").pluck(:id)
    range_user_id = user_ids[rand(user_ids.length-1)]
    rand_sync_user = User.find_by_id(range_user_id)  #生成随机用户
    unless rand_sync_user.present?
      rand_user
    end
    rand_sync_user
  end
end