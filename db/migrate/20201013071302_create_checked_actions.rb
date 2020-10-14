class CreateCheckedActions < ActiveRecord::Migration[5.2]
  def change
    create_table :checked_actions do |t|
      t.integer  "user_id"
      t.string   "action_type"
      t.datetime "action_at"
      t.integer  "checkable_id"
      t.string   "checkable_type"
      t.timestamps
    end
    add_index :checked_actions, :user_id
    add_index :checked_actions, :action_type
  end
end
