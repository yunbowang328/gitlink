class AddOrderIndexToPlatfomCommunicates < ActiveRecord::Migration[5.2]
  def change
    add_column :platform_communicates, :order_index, :integer, default: 0
  end
end
