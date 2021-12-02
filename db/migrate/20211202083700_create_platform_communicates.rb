class CreatePlatformCommunicates < ActiveRecord::Migration[5.2]
  def change
    create_table :platform_communicates do |t|
      t.string :title
      t.string :content 
      t.text :tag_field
      t.integer :fake_id

      t.timestamps
    end
  end
end
