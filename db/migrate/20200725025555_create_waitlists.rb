class CreateWaitlists < ActiveRecord::Migration[5.2]
  def change
    create_table :waitlists do |t|
      t.string :applicant_id
      t.string :integer
      t.string :reviewer_id
      t.string :integer

      t.timestamps
    end
  end
end
