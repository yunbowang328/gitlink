class CreateTeamUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :team_users do |t|
      t.references :organization
      t.references :team 
      t.references :user
      t.timestamps
    end
  end
end
