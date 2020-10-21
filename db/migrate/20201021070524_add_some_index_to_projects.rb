class AddSomeIndexToProjects < ActiveRecord::Migration[5.2]
  def change
    add_index :projects, :project_category_id
    add_index :projects, :project_language_id
    add_index :projects, :is_public
    add_index :projects, :status
    add_index :projects, :forked_from_project_id
    add_index :projects, :recommend
    add_index :projects, :platform
  end
end
