class AddPlatformToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :platform, :string, default: 0
  end
end
