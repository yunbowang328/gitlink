class AddCiUserIdToCiCloudAccounts < ActiveRecord::Migration[5.2]
  def change
    add_column :ci_cloud_accounts, :ci_user_id, :integer
  end
end
