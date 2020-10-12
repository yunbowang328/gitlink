class CreateForumModerators < ActiveRecord::Migration[5.2]
  def change
    create_table :forum_moderators do |t|
      t.integer  "user_id"
      t.integer  "forum_section_id"
      t.boolean  "is_children",      :default => false
      t.timestamps
    end
    add_index :forum_moderators, :user_id 
    add_index :forum_moderators, :forum_section_id
    add_index :forum_moderators, :is_children
  end
end
