class AddSourceCloneUrlToRepositories < ActiveRecord::Migration[5.2]
  def change
    add_column :repositories, :source_clone_url, :string, default: ""
  end
end
