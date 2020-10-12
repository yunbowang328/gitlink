class CreateMemoForums < ActiveRecord::Migration[5.2]
  def change
    create_table :memo_forums do |t|
      t.integer :memo_id
      t.integer :forum_id
      t.boolean  :is_children, :default => false
      t.timestamps
    end
    add_index :memo_forums, :memo_id
    add_index :memo_forums, :forum_id
    add_index :memo_forums, :is_children
  end
end
