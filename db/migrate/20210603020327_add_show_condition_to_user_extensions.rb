class AddShowConditionToUserExtensions < ActiveRecord::Migration[5.2]
  def change
    add_column :user_extensions, :show_email, :boolean, default: false
    add_column :user_extensions, :show_location, :boolean, default: false 
    add_column :user_extensions, :show_department, :boolean, default: false
  end
end
