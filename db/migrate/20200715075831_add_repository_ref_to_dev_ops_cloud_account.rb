class AddRepositoryRefToDevOpsCloudAccount < ActiveRecord::Migration[5.2]
  def change
    add_column :dev_ops_cloud_accounts, :repo_id, :integer

    add_index :dev_ops_cloud_accounts, :repo_id, name: 'dev_ops_cloud_accounts_repo_id_ix'
  end
end
