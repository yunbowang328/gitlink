class CreateTemplateMessageSettings < ActiveRecord::Migration[5.2]
  def change
    # 平台的通知设置
    create_table :template_message_settings do |t|
      t.string :type
      t.string :name 
      t.string :key
      t.boolean :openning, default: true
      t.boolean :notification_disabled, default: true
      t.boolean :email_disabled, default: false

      t.timestamps
    end

    TemplateMessageSetting.build_init_data
  end
end
