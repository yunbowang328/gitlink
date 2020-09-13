class AddColumnToSponsorTiers < ActiveRecord::Migration[5.2]
  def change
    add_column :sponsor_tiers, :description, :string, default: ""
    add_column :sponsor_tiers, :user_id, :integer
  end
end
