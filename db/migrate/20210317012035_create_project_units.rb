class CreateProjectUnits < ActiveRecord::Migration[5.2]
  def change
    create_table :project_units do |t|
      t.references :project 
      t.integer :unit_type

      t.timestamps
    end
  end
end
