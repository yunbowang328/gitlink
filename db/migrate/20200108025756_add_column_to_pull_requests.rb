class AddColumnToPullRequests < ActiveRecord::Migration[5.2]
  def change
    add_column :pull_requests, :version_id, :integer
    add_column :pull_requests, :body, :text
    add_column :pull_requests, :from_ref, :string
    add_column :pull_requests, :to_ref, :string
  end
end
