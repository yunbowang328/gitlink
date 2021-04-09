class AddGiteaTokenToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :gitea_token, :string
  end
end
