class CreateAppliedTransferProjects < ActiveRecord::Migration[5.2]
  def change
    create_table :applied_transfer_projects do |t|
      t.references :project 
      t.references :owner
      t.references :user
      t.integer :status, default: 0

      t.timestamps
    end
  end
end
