class CreateWaitlists < ActiveRecord::Migration[5.2]
  def change
    create_table :waitlists do |t|
      t.integer :applicant_id
      t.integer :reviewer_id

      t.timestamps
    end
  end
end
