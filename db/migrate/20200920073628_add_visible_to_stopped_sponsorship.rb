class AddVisibleToStoppedSponsorship < ActiveRecord::Migration[5.2]
  def change
    add_column :stopped_sponsorships, :visible, :integer
  end
end
