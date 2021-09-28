class CreateMessageTemplates < ActiveRecord::Migration[5.2]
  def change
    create_table :message_templates do |t|
      t.string :type 
      t.text :sys_notice
      t.text :email

      t.timestamps
    end
  end
end
