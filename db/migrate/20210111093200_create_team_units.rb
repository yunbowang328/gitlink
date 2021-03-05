class CreateTeamUnits < ActiveRecord::Migration[5.2]
  def change
    create_table :team_units do |t|
      t.references :organization 
      t.references :team 
      t.integer :unit_type, comment: "访问单元类型"

      t.timestamps
    end
  end
end
