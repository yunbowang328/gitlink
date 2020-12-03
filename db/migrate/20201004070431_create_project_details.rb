class CreateProjectDetails < ActiveRecord::Migration[5.2]
  def change
    create_table :project_details do |t|
      t.integer :project_id
      t.longtext :content

      t.timestamps
    end

    add_index :project_details, :project_id
  end
end
