class AddIpToUserActions < ActiveRecord::Migration[5.2]
  def change
    add_column :user_actions, :ip, :string
  end
end
