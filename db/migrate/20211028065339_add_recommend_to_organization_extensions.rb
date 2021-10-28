class AddRecommendToOrganizationExtensions < ActiveRecord::Migration[5.2]
  def change
    add_column :organization_extensions, :recommend, :boolean, default: false
  end
end
