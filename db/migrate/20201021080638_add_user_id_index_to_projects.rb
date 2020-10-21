class AddUserIdIndexToProjects < ActiveRecord::Migration[5.2]
  def change
    add_index :projects, :user_id
    add_index :projects, :name
  end
end
