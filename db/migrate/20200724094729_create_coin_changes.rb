class CreateCoinChanges < ActiveRecord::Migration[5.2]
  def change
    create_table :coin_changes do |t|
      t.integer :amount
      t.string :description
      t.string :reason
      t.integer :to_wallet_id
      t.integer :from_wallet_id

      t.timestamps
    end
  end
end
