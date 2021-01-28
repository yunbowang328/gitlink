class AddParentCategoryToCiTemplates < ActiveRecord::Migration[5.2]
  def change
    add_column :ci_templates, :parent_category, :string
  end
end
