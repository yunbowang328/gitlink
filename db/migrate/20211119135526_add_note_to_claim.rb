class AddNoteToClaim < ActiveRecord::Migration[5.2]
  def change
    add_column :claims, :note, :text
  end
end
