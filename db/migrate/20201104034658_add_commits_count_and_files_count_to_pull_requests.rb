class AddCommitsCountAndFilesCountToPullRequests < ActiveRecord::Migration[5.2]
  def change
    add_column :pull_requests, :comments_count, :integer, default: 0, comment: 'number of comments for pull request'
    add_column :pull_requests, :commits_count, :integer, default: 0, comment: 'number of git commits for pull request'
    add_column :pull_requests, :files_count, :integer, default: 0, comment: 'number of git change files for pull request'
  end
end
