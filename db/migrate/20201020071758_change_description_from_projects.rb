class ChangeDescriptionFromProjects < ActiveRecord::Migration[5.2]
  def change
    change_column :projects, :description, :longtext
  end
end
