class CreateProjectStatistics < ActiveRecord::Migration[5.2]
  def change
    create_table :project_statistics do |t|
      t.integer :common_projects_count, :default => 0
      t.integer :mirror_projects_count, :default => 0
      t.integer :sync_mirror_projects_count, :default => 0
      t.integer :commits_total_count, :default => 0

      t.timestamps
    end
  end
end
