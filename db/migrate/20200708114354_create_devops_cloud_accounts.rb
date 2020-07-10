class CreateDevopsCloudAccounts < ActiveRecord::Migration[5.2]
  def change
    create_table :devops_cloud_accounts do |t|
      t.integer :project_id, null: false
      t.integer :user_id, null: false
      t.integer :ip_num, null: false
      t.string :account, null: false
      t.string :secret, null: false

      t.timestamps
    end
    add_index :devops_cloud_accounts, [:project_id, :user_id, :ip_num]
  end
end
