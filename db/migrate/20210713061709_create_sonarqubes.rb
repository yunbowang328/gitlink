class CreateSonarqubes < ActiveRecord::Migration[5.2]
  def change
    create_table :sonarqubes do |t|
      t.integer :loophole, :default => 0
      t.integer :repetition_rate, :default => 0
      t.integer :bug_num, :default => 0
      t.integer :file_num, :default => 0
      t.integer :project_id
      t.integer :branch_name

      t.timestamps
    end
  end
end
