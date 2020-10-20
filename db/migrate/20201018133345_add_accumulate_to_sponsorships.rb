class AddAccumulateToSponsorships < ActiveRecord::Migration[5.2]
  def change
    add_column :sponsorships, :accumulate, :integer, default: 0
    add_column :stopped_sponsorships, :accumulate, :integer, default: 0
  end
end
