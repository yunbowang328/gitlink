class CreateForums < ActiveRecord::Migration[5.2]
  def change
    create_table :forums do |t|
      t.string   "name",                        :null => false
      t.text     "description"
      t.integer  "topic_count",  :default => 0
      t.integer  "memo_count",   :default => 0
      t.integer  "last_memo_id", :default => 0
      t.integer  "creator_id",                  :null => false
      t.integer  "sticky"
      t.integer  "locked"
      t.integer  "visits",       :default => 0
      t.timestamps
    end
    add_index :forums, :name 
    add_index :forums, :creator_id
  end
end
