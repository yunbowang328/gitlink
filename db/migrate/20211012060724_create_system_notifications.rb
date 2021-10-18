class CreateSystemNotifications < ActiveRecord::Migration[5.2]
  def change
    # 系统消息
    create_table :system_notifications do |t|
      t.string :subject, comment: "标题"
      t.string :sub_subject, comment: "副标题"
      t.string :content, comment: "正文"
      t.boolean :is_top, comment: "是否置顶"
      
      t.timestamps
    end
  end
end
