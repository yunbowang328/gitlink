class AddWebsiteToProjects < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :default_branch, :string, default: 'master'
    add_column :projects, :website, :string 
  end
end
