class AddOriginProjectIdToPullRequest < ActiveRecord::Migration[5.2]
  def change
    # add_column :pull_requests, :fork_project_id, :integer 
    # add_column :pull_requests, :is_original, :boolean, default: false
  end
end
