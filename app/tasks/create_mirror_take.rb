class CreateMirrorRake
  # 运行示例: 检查哪些项目的repo不存在，bundle exec rails runner "CreateMirrorRake.new.call()"
  
    def call
      SyncLog.sync_log("=====begin to create mirror======")
      empty_repo = []
      all_projects = Project.select(:id,:identifier,:user_id, :gpid, :forked_count,:is_public).includes(:owner, :repository)
      all_projects.each do |project|
        SyncLog.sync_log("=====check_project_id:#{project.id}======")
        CheckMirrorJob.perform_later(project)
      end
      SyncLog.sync_log("=====completed_response======")
    end
  end