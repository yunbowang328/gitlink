class AddWatchersCountToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :watchers_count, :integer, default: 0 
  end
end
