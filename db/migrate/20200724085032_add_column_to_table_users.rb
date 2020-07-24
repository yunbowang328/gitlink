class AddColumnToTableUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :description, :string, default: ""
    add_column :users, :sponsor_certification, :integer, default: 0
    add_column :users, :sponsor_num, :integer, default: 0
    add_column :users, :sponsored_num, :integer, default: 0
  end
end
