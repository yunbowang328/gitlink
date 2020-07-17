class CheckMirrorRake
  # 运行示例: 检查哪些项目的repo不存在，bundle exec rails runner "CheckMirrorRake.new.call()"
  
    def call
      SyncLog.sync_log("=====begin to check mirror======")
      empty_repo = []
      empty_user = []
      all_projects = Project.select(:id,:identifier,:user_id, :gpid, :forked_count,:is_public).includes(:owner, :repository)
      all_projects.each do |project|
        SyncLog.sync_log("=====check_project_id:#{project.id}======")
        if project&.owner&.login.present? && 
          response = Gitea::Repository::Branches::ListService.new(project.owner, project.identifier).call
        else
          response = "224444"
          empty_user.push(project.id)
        end
        unless response.present?
          empty_repo.push(project.id)
        end
      end

      SyncLog.empty_repo_project_log("=====empty_repo_project_ids:#{empty_repo}======")
      SyncLog.empty_repo_project_log("=====empty_user_project_ids:#{empty_user}======")
      SyncLog.sync_log("=====empty_repo_project_ids:#{empty_repo}======")
      SyncLog.sync_log("=====empty_user_project_ids:#{empty_user}======")

      if empty_repo.present?
        SyncLog.sync_log("**=====begin_create_empty_repo======**")
        empty_repo_projects = all_projects.where(id: empty_repo)
        empty_repo_projects.each do |project|
          SyncLog.sync_log("**====create_empty_repo_project_id: #{project.id}======**")
          CheckMirrorJob.perform_later(project)
        end
        SyncLog.sync_log("**=====endcreate_empty_repo======**")
      end
    end
  end