class AddColumnsToOrganizationExtension < ActiveRecord::Migration[5.2]
  def change
    add_column :organization_extensions, :num_projects, :integer, default: 0
    add_column :organization_extensions, :num_users, :integer, default: 0
    add_column :organization_extensions, :num_teams, :integer, default: 0

    OrganizationExtension.find_each do |e|
      OrganizationExtension.reset_counters(e.id, :organization_users)
      OrganizationExtension.reset_counters(e.id, :projects)
      OrganizationExtension.reset_counters(e.id, :teams)
    end
  end
end
