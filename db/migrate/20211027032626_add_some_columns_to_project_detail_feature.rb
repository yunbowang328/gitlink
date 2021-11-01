class AddSomeColumnsToProjectDetailFeature < ActiveRecord::Migration[5.2]
  def change
    add_column :project_categories, :pinned_index, :integer, default: 0
    add_column :projects, :is_pinned, :boolean, default: false
    add_column :projects, :recommend_index, :integer, default: 0
  end
end
