class AddAwardTimeToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :award_time, :datetime
  end
end
