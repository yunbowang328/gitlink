# == Schema Information
#
# Table name: template_message_settings
#
#  id                    :integer          not null, primary key
#  type                  :string(255)
#  name                  :string(255)
#  key                   :string(255)
#  openning              :boolean
#  notification_disabled :boolean
#  email_disabled        :boolean
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#

class TemplateMessageSetting < ApplicationRecord

  scope :openning, ->() {where(openning: true)}

  def self.type_name 
    ""
  end

  def self.build_init_data
    TemplateMessageSetting::CreateOrAssign.build_init_data
    TemplateMessageSetting::ManageProject.build_init_data
    TemplateMessageSetting::Normal.build_init_data
    TemplateMessageSetting::WatchProject.build_init_data
  end
end
