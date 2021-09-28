class AddNotificationUrlToMessageTemplates < ActiveRecord::Migration[5.2]
  def change
    add_column :message_templates, :notification_url, :string
  end
end
