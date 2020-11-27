class AddSyncNumToMirrors < ActiveRecord::Migration[5.2]
  def change
    add_column :mirrors, :sync_num, :integer, default: 1
  end
end
