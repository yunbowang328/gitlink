class CreateIssueTags < ActiveRecord::Migration[5.2]
  def change
    create_table :issue_tags do |t|
      t.string :title
      t.string :description
      t.string :color
      t.integer :user_id
      t.integer :project_id
      t.integer :issues_count,default: 0
      t.timestamps
    end
    add_index :issue_tags, [:user_id, :title,:project_id]
  end
end
