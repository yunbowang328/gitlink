class AddColumnsToPullRequests < ActiveRecord::Migration[5.2]
  def change
    add_column :pull_requests, :issue_id, :integer
    add_column :issues, :issue_classify, :string
  end
end
