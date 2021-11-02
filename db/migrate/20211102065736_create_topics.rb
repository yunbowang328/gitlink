class CreateTopics < ActiveRecord::Migration[5.2]
  def change
    create_table :topics do |t|
      t.string :type
      t.string :title 
      t.integer :uuid
      t.string :image_url
      t.string :url
      t.integer :order_index
    end
  end
end
