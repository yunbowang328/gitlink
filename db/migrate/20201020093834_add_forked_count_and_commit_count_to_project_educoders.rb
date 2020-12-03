class AddForkedCountAndCommitCountToProjectEducoders < ActiveRecord::Migration[5.2]
  def change
    add_column :project_educoders, :commit_count, :integer, default: 0
    add_column :project_educoders, :forked_count, :integer, default: 0
  end
end
