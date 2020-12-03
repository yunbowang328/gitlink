class AddGiteaOauthIdAndProjectIdToOauths < ActiveRecord::Migration[5.2]
  def change
    add_column :oauths, :gitea_oauth_id, :integer
    add_column :oauths, :project_id, :integer
  end
end
