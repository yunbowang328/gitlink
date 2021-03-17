class AddOrderIndexToProject < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :order_index, :integer, default: 0
  end
end
