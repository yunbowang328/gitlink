class DropDevopsCloundAccountsTable < ActiveRecord::Migration[5.2]
  def change
    drop_table(:devops_cloud_accounts) if ActiveRecord::Base.connection.tables.include?('devops_cloud_accounts')
  end
end
