class ChangeProjectWatchersCount < ActiveRecord::Migration[5.2]
  #修改project的watchers_count 不正确的问题
  def change
    watcher_ids = Watcher.where(watchable_type: "Project").pluck(:watchable_id).uniq 
    watcher_ids.each do |i|
      puts "#######____update_project_watchers_id____##############{i}"
      p = Project.includes(:watchers).select(:id, :watchers_count).find_by(id:i) 
      if p.present?
        Project.reset_counters(i, :watchers)
      end
    end
  end
end
