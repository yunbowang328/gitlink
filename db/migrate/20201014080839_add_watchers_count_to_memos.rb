class AddWatchersCountToMemos < ActiveRecord::Migration[5.2]
  def change
    add_column :memos, :watchers_count, :integer, default: 0
  end
end
