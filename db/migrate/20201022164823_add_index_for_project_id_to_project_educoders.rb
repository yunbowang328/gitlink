class AddIndexForProjectIdToProjectEducoders < ActiveRecord::Migration[5.2]
  def change
    add_index :project_educoders, :repo_name
    add_index :project_educoders, :project_id
  end
end
