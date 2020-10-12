class CreateMemos < ActiveRecord::Migration[5.2]
  def change
    create_table :memos do |t|
      t.integer :forum_id, :null => false
      t.integer :parent_id, null: true
      t.string :subject, null: false
      t.text :content, null: false
      t.integer :author_id, null: false
      t.integer :replies_count, default: 0
      t.integer :last_reply_id
      t.boolean :lock, default: false
      t.boolean :sticky, default: false
      t.integer  :viewed_count,                           :default => 0
      t.integer  :root_id
      t.integer  :reward
      t.string   :language
      t.boolean  :hidden,                                 :default => true
      t.string   :repertoire_name
      t.boolean  :is_md,                                  :default => true
      t.datetime :published_at
      t.boolean  :homepage_show,                          :default => false
      t.integer  :praises_count,                          :default => 0
      t.boolean  :is_fine,                                :default => false
      t.datetime :last_reply_on
      t.integer  :tag_id,                                 :default => 1
      t.boolean  :is_original
      t.string   :reprint_link
      t.integer  :forum_section_id
      t.integer  :destroy_status
      t.timestamps
    end
    add_index :memos, :forum_id
    add_index :memos, :author_id
    add_index :memos, :forum_section_id
    add_index :memos, :destroy_status
  end
end
