class ChangeProjectWatchersCount < ActiveRecord::Migration[5.2]
  def change
    watcher_ids = Watcher.where(watchable_type: "Project").pluck(:watchable_id).uniq 
    watcher_ids.each do |i|
      puts "#######____update_project_watchers_id____##############{i}"
      p = Project.includes(:watchers).select(:id, :watchers_count).find_by(i) 
      if p.present?
        p.update_attribute(:watchers_count, p.watchers.size)
      end
    end
  end
end
