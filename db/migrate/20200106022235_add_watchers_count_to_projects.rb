class AddWatchersCountToProjects < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :watchers_count, :integer, :default => 0
  end
end
