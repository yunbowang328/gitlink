class CreateDevOpsCloudAccounts < ActiveRecord::Migration[5.2]
  def change
    create_table :dev_ops_cloud_accounts do |t|
      t.integer :project_id, null: false
      t.integer :user_id, null: false
      t.integer :ip_num
      t.string :account
      t.string :secret

      t.timestamps
    end
    add_index :dev_ops_cloud_accounts, [:project_id, :user_id, :ip_num], name: 'dev_ops_cloud_accounts_p_u_ip'
  end
end
