class AddIsMirrorToRepositories < ActiveRecord::Migration[5.2]
  def change
    add_column :repositories, :is_mirror, :boolean, default: false
  end
end
