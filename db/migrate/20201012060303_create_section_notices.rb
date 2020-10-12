class CreateSectionNotices < ActiveRecord::Migration[5.2]
  def change
    create_table :section_notices do |t|
      t.integer  "user_id"
      t.integer  "forum_section_id"
      t.text     "content"
      t.timestamps
    end
    add_index :section_notices, :user_id 
    add_index :section_notices, :forum_section_id
  end
end
