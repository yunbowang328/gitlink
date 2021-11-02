class CreateSystemNotificationHistories < ActiveRecord::Migration[5.2]
  def change
    create_table :system_notification_histories do |t|
      t.references :system_notification
      t.references :user
      
      t.timestamps
    end
  end
end
