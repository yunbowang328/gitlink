class AddGiteaWebhookIdToProjects < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :gitea_webhook_id, :integer
  end
end
