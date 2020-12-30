class AddServerTypeToCiCloudAccounts < ActiveRecord::Migration[5.2]
  def change
    add_column :ci_cloud_accounts, :server_type, :integer, default: 0
  end
end
