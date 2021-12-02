class CreatePlatformStatistics < ActiveRecord::Migration[5.2]
  def change
    create_table :platform_statistics do |t|
      t.integer :visits, default: 0
      t.integer :users_count, default: 0

      t.timestamps
    end
  end
end
