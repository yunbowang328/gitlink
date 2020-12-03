class AddCoverIdToDevOpsLanguages < ActiveRecord::Migration[5.2]
  def change
    add_column :dev_ops_languages, :cover_id, :integer
  end
end
