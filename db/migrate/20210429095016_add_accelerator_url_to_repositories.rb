class AddAcceleratorUrlToRepositories < ActiveRecord::Migration[5.2]
  def change
    add_column :repositories, :accelerator_url, :string, default: ""
  end
end
