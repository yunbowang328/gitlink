class CreateUserTemplateMessageSettings < ActiveRecord::Migration[5.2]
  def change
    # 用户对系统通知的设置
    create_table :user_template_message_settings do |t|
      t.references :user 
      t.text :notification_body 
      t.text :email_body

      t.timestamps
    end
  end
end
