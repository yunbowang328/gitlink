class CheckMirrorRake
  # 运行示例: 检查哪些项目的repo不存在，bundle exec rails runner "CheckMirrorRake.new.call()"
  
    def call
      SyncLog.sync_log("=====begin to check mirror======")
      empty_repo = []
      all_projects = Project.select(:id,:identifier,:user_id, :gpid, :forked_count,:is_public).includes(:owner, :repository)
      all_projects.each do |project|
        SyncLog.sync_log("=====check_project_id:#{project.id}======")
        # CheckMirrorJob.perform_later(project)

        response = Gitea::Repository::Branches::ListService.new(project.owner, project.identifier).call
        unless response.present?
          empty_repo.push(project.id)
        end
      end
      SyncLog.sync_log("=====completed_response:#{empty_repo}======")
    end
  end