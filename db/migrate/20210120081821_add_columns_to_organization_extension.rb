class AddColumnsToOrganizationExtension < ActiveRecord::Migration[5.2]
  def change
    add_column :organization_extensions, :num_projects, :integer, default: 0
    add_column :organization_extensions, :num_users, :integer, default: 0
  end
end
