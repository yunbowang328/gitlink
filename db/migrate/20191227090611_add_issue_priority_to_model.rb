class AddIssuePriorityToModel < ActiveRecord::Migration[5.2]
  def change
    unless ActiveRecord::Base.connection.table_exists? 'IssuePriority'
      create_table :issue_priorities do |t|
        t.string :name
        t.integer :position
        t.timestamps
      end

      add_index :issue_priorities, [:name]

      pr_values = %w(低 正常 高 紧急 立刻)
      pr_values.each_with_index do |v, index|
        IssuePriority.create!(name: v, position: index+1)
      end
    end
  end
end
