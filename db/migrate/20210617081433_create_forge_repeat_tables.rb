class CreateForgeRepeatTables < ActiveRecord::Migration[5.2]
  def change
    create_table :forge_applied_messages do |t|
      t.references :user
      t.references :applied, polymorphic: true
      t.integer :viewed, default: 0
      t.integer :status , default: 0
      t.string :name 
      t.references :applied_user 
      t.integer :role
      t.references :project

      t.timestamps
    end

    create_table :forge_applied_projects do |t|
      t.references :project 
      t.references :user 
      t.integer :role, default: 0
      t.integer :status, default: 0

      t.timestamps
    end
  end
end
