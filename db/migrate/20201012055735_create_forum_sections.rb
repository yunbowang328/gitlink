class CreateForumSections < ActiveRecord::Migration[5.2]
  def change
    create_table :forum_sections do |t|
      t.integer  "user_id"
      t.string   "title"
      t.integer  "position",       :default => 0
      t.integer  "parent_id"
      t.integer  "is_recommend",   :default => 0
      t.string   "ancestry"
      t.integer  "attachment_id"
      t.text     "description"
      t.integer  "memos_count",    :default => 0
      t.integer  "watchers_count", :default => 0
      t.timestamps
    end
    add_index :forum_sections, :user_id
    add_index :forum_sections, :title
    add_index :forum_sections, :position
    add_index :forum_sections, :ancestry 

  end
end
