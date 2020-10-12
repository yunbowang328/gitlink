class CreateBannedForums < ActiveRecord::Migration[5.2]
  def change
    create_table :banned_forums do |t|
      t.integer  "user_id"
      t.integer  "author_id"
      t.integer  "memo_id"
      t.integer  "banned_count", :default => 0
      t.boolean  "is_banned",    :default => false
      t.timestamps
    end
    add_index :banned_forums, :user_id 
    add_index :banned_forums, :author_id 
    add_index :banned_forums, :memo_id
  end
end
