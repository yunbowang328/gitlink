class CreateMemoMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :memo_messages do |t|
      t.integer  "user_id"
      t.integer  "forum_id"
      t.integer  "memo_id"
      t.string   "memo_type"
      t.integer  "viewed"
      t.timestamps
    end
  end
end
