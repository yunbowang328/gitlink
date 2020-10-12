class CreateVisitActions < ActiveRecord::Migration[5.2]
  def change
    create_table :visit_actions do |t|
      t.integer :visitable_id
      t.string :visitable_type
      t.integer :user_id
      t.timestamps
    end
    add_index :visit_actions, :user_id 
    add_index :visit_actions, [:visitable_type, :visitable_id]
    add_index :visit_actions,[:visitable_id,:user_id]

  end
end
