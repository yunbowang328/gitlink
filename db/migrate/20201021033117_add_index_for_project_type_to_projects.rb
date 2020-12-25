class AddIndexForProjectTypeToProjects < ActiveRecord::Migration[5.2]
  def change
    add_index :projects, :project_type
  end
end
