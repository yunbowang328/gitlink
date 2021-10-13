class ChangeSystemNotificationContentColumn < ActiveRecord::Migration[5.2]
  def change
    change_column :system_notifications, :content, :text
  end
end
