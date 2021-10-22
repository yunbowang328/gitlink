class AddSonarUrlToProjects < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :sonar_url, :string
  end
end
