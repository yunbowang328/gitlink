class RemoveIndexFromProjects < ActiveRecord::Migration[5.2]
  def change
    remove_index :projects, :project_language_id
    remove_index :projects, :project_category_id
    remove_index :projects, :user_id
  end
end
