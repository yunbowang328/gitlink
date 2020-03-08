class SortToProjectCategoriesWithPosition < ActiveRecord::Migration[5.2]
  def change
    ProjectCategory.order(:updated_at).each.with_index(1) do |pc, index|
      pc.update_column :position, index
    end
  end
end
