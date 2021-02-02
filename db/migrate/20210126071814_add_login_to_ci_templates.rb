class AddLoginToCiTemplates < ActiveRecord::Migration[5.2]
  def change
    add_column :ci_templates, :login, :string
  end
end
