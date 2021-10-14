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

#我关注的
class TemplateMessageSetting::WatchProject < TemplateMessageSetting 

  def self.type_name 
    "我关注的仓库"
  end

  def self.build_init_data
  end
end
