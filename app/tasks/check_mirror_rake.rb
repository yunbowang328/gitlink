class CheckMirrorRake
  # 运行示例: 检查哪些项目的repo不存在，bundle exec rails runner "CheckMirrorRake.new.call()"
  
    def call
      SyncLog.sync_log("=====begin to check mirror======")
      empty_repo = []
      empty_user = []
      all_projects = Project.select(:id,:identifier,:user_id, :gpid, :forked_count,:is_public).includes(:owner, :repository)
      all_projects.each do |project|
        SyncLog.sync_log("=====check_project_id:#{project.id}======")
        # CheckMirrorJob.perform_later(project)
        if project.owner.present?
          response = Gitea::Repository::Branches::ListService.new(project.owner, project.identifier).call
        else
          response = "22"
          empty_user.push(project.id)
        end
        unless response.present?
          empty_repo.push(project.id)
        end
      end
      SyncLog.sync_log("=====empty_repo_project_ids:#{empty_repo}======")
      SyncLog.sync_log("=====empty_user_project_ids:#{empty_user}======")
    end
  end