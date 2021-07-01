class AddProjectLanguageIndexToProjects < ActiveRecord::Migration[5.2]
  def change
    add_index :projects, :project_category_id
    add_index :projects, :project_language_id 
    add_index :projects, :license_id
  end
end
