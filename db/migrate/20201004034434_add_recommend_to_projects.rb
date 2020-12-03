class AddRecommendToProjects < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :recommend, :boolean, default: false
  end
end
