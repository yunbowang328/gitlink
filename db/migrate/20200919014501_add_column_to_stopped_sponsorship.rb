class AddColumnToStoppedSponsorship < ActiveRecord::Migration[5.2]
  def change
    add_column :stopped_sponsorships, :start_time, :datetime
  end
end
