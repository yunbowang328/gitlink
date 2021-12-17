class CreatePlatformPeople < ActiveRecord::Migration[5.2]
  def change
    create_table :platform_people do |t| 
      t.string :name
      t.string :image_url
      t.string :announcement
      t.text :content

      t.timestamps
    end
  end
end
