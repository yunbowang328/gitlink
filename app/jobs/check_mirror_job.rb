
# 运行示例: bundle exec rails runner "CheckMirrorJob.new.call()"

class CheckMirrorJob < ApplicationJob
  queue_as :default

  def perform(project)
    SyncLog.sync_log("==========begin_check_project_id_job:#{project.id}============")
    begin 
      response = Gitea::Repository::Branches::ListService.new(project.owner, project.identifier).call
      unless response.present?
        SyncLog.sync_log("==========check_project_error_id:#{project.id}============")
        ActiveRecord::Base.transaction do
          delete_gitea = Gitea::Repository::DeleteService.new(project.owner, project.identifier).call
          if delete_gitea.status == 204 || delete_gitea.status == 404   #删除成功或者仓库不存在，都重新创建
            repository_params= {
              name: project.identifier,
              auto_init: true,
              private: project.repository.hidden,
            }
            gitea_repository = Gitea::Repository::CreateService.new(project.owner.gitea_token, repository_params).call
            if gitea_repository
              project.update_columns(gpid: gitea_repository["id"],forked_count: gitea_repository["forks_count"])
            else
              SyncLog.sync_log("==========gitea_repository_created_failed:#{project.id}============")
            end
          else
            SyncLog.sync_log("==========delete_gitea_failed:#{project.id}============")
          end
        end
      end
    rescue => e
      SyncLog.sync_log("==========failed_check_project_id:#{project.id}============errors:#{e}")
    end
  end
end