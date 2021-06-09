class CreatePinnedProjects < ActiveRecord::Migration[5.2]
  def change
    create_table :pinned_projects do |t|
      t.references :user 
      t.references :project
      t.integer :position, default: 0

      t.timestamps
    end
  end
end
