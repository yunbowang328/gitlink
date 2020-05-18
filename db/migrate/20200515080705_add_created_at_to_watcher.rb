class AddCreatedAtToWatcher < ActiveRecord::Migration[5.2]
  def change
    add_column :watchers, :created_at, :datetime
    Watcher.update_all(created_at: Time.current)
  end
end
