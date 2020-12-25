class CreateApplySignatures < ActiveRecord::Migration[5.2]
  def change
    create_table :apply_signatures do |t|
      t.references :user
      t.references :project 
      t.integer :status, default: 0

      t.timestamps
    end
  end
end
