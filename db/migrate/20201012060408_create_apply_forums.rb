class CreateApplyForums < ActiveRecord::Migration[5.2]
  def change
    create_table :apply_forums do |t|
      t.integer  "user_id"
      t.string   "user_ip"
      t.integer  "forum_section_id"
      t.integer  "is_confirm",       :default => 0
      t.integer  "confirm_user_id"
      t.datetime "deal_time"
      t.timestamps
    end
    add_index :apply_forums, :user_id 
    add_index :apply_forums, :forum_section_id
    add_index :apply_forums, :is_confirm
  end
end
