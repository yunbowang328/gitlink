class AddEmailTitleToMessageTemplates < ActiveRecord::Migration[5.2]
  def change
    add_column :message_templates, :email_title, :string
  end
end
