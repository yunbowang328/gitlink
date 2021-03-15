class CreateIssueTimes < ActiveRecord::Migration[5.2]
  def change
    create_table :issue_times do |t|
      t.integer :issue_id
      t.integer :user_id
      t.datetime :start_time
      t.datetime :end_time
      t.string :cost_time
      t.timestamps
    end
    add_index :issue_times, [:issue_id, :user_id]
  end
end
