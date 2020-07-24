class CreateWallets < ActiveRecord::Migration[5.2]
  def change
    create_table :wallets do |t|
      t.integer :balance
      t.integer :user_id

      t.timestamps
    end
  end
end
