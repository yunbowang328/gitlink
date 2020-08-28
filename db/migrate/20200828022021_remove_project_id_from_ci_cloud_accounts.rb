class RemoveProjectIdFromCiCloudAccounts < ActiveRecord::Migration[5.2]
  def change
    remove_column :ci_cloud_accounts, :project_id
    remove_column :ci_cloud_accounts, :repo_id
    remove_column :ci_cloud_accounts, :drone_token
  end
end
