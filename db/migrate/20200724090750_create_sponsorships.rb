class CreateSponsorships < ActiveRecord::Migration[5.2]
  def change
    create_table :sponsorships do |t|
      t.integer :amount
      t.integer :visible
      t.integer :sponsor_id
      t.integer :developer_id

      t.timestamps
    end
  end
end
