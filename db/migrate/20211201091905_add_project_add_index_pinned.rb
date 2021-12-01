class AddProjectAddIndexPinned < ActiveRecord::Migration[5.2]
  def change
    add_index :projects, :is_pinned
  end
end
