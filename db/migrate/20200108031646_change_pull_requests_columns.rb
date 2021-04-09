class ChangePullRequestsColumns < ActiveRecord::Migration[5.2]
  def change
    # remove_column :pull_request_assigns, :user_id
    # add_column :pull_request_assigns, :user_login, :string
    #
    # add_index :pull_request_assigns, [:user_login]

    rename_column :pull_requests, :version_id, :milestone
    rename_column :pull_requests, :from_ref, :head
    rename_column :pull_requests, :to_ref, :base


  end
end
