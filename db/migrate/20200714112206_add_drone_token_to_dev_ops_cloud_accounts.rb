class AddDroneTokenToDevOpsCloudAccounts < ActiveRecord::Migration[5.2]
  def change
    add_column :dev_ops_cloud_accounts, :drone_token, :string
  end
end
