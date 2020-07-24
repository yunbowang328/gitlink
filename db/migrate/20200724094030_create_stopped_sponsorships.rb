class CreateStoppedSponsorships < ActiveRecord::Migration[5.2]
  def change
    create_table :stopped_sponsorships do |t|
      t.integer :amount
      t.integer :sponsor_id
      t.integer :developer_id

      t.timestamps
    end
  end
end
