class CreateClaims < ActiveRecord::Migration[5.2]
  def change
    create_table :claims do |t|
      t.integer :issue_id
      t.integer :user_id
      t.timestamps
      t.index :issue_id
      t.index :user_id
    end
  end
end
