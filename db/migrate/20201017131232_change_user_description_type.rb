class ChangeUserDescriptionType < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :description
    add_column :users, :description, :text
  end
end
