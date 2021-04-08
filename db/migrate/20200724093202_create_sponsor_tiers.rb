class CreateSponsorTiers < ActiveRecord::Migration[5.2]
  def change
    create_table :sponsor_tiers do |t|
      t.integer :tier

      t.timestamps
    end
  end
end
