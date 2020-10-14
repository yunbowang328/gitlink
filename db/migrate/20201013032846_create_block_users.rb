class CreateBlockUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :block_users do |t|
      t.integer  "user_id"
      t.integer  "block_user_id"
      t.timestamps
    end
    add_index :block_users, :user_id 
    add_index :block_users, :block_user_id
  end
end
