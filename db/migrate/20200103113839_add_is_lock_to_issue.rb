class AddIsLockToIssue < ActiveRecord::Migration[5.2]
  def change
    add_column :issues, :is_lock, :boolean, default: false
  end
end
