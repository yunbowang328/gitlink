class AddColumnToIssueTags < ActiveRecord::Migration[5.2]
  def change
    add_column :issue_tags, :gid, :integer
    add_column :issue_tags, :gitea_url, :string
  end
end
