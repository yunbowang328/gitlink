class AddIndexForUpdatedOnToProjects < ActiveRecord::Migration[5.2]
  def change
    add_index :projects, :updated_on
  end
end
