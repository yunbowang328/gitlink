class AddOpenDevopsToProjects < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :open_devops, :boolean, default: false
  end
end
