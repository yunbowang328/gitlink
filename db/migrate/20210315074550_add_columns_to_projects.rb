class AddColumnsToProjects < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :license_id, :integer
    add_column :projects, :ignore_id, :integer
  end
end
