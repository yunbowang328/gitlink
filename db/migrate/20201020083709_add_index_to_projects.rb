class AddIndexToProjects < ActiveRecord::Migration[5.2]
  def change
    add_index :projects, :identifier, name: 'index_projects_on_identifier'
  end
end
