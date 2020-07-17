class CheckMirrorRake
  # 运行示例: bundle exec rails runner "CheckMirrorRake.new.call()"
  
    def call
      SyncLog.sync_log("=====begin to check mirror======")
      all_projects = Project.select(:id,:identifier,:user_id, :gpid, :forked_count,:is_public).includes(:owner, :repository)
      all_projects.each do |project|
        SyncLog.sync_log("=====check_project_id:#{project.id}======")
        CheckMirrorJob.perform_later(project)
      end
    end
  end