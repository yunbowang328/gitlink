class AddIssuesCountToVersions < ActiveRecord::Migration[5.2]
  def change
    add_column :versions, :issues_count, :integer, :default => 0
    add_column :versions, :closed_issues_count, :integer, :default => 0
    add_column :versions, :percent, :float, default: 0.0
  end
end
