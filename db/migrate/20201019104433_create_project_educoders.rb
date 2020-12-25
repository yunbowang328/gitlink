class CreateProjectEducoders < ActiveRecord::Migration[5.2]
  def change
    create_table :project_educoders do |t|
      t.string :owner
      t.string :repo_name
      t.string :image_url
      t.integer :project_id

      t.timestamps
    end
  end
end
