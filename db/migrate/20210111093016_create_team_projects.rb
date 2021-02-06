class CreateTeamProjects < ActiveRecord::Migration[5.2]
  def change
    create_table :team_projects do |t|
      t.references :organization
      t.references :project 
      t.references :team

      t.timestamps
    end
  end
end
