class RenameDevOpsCloudAccountToCiCloudAccount < ActiveRecord::Migration[5.2]
  def change
    rename_table :dev_ops_cloud_accounts, :ci_cloud_accounts
  end
end
