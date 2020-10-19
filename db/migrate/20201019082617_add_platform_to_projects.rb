class AddPlatformToProjects < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :platform, :integer, default: 0
  end
end
