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

#我管理的
class TemplateMessageSetting::ManageProject < TemplateMessageSetting 

  def self.type_name 
    "我管理的仓库"
  end

  def self.order_index 
    30
  end

  def self.build_init_data
    self.find_or_create_by(name: "有新的易修", key: "Issue")
    self.find_or_create_by(name: "有新的合并请求", key: "PullRequest")
    self.find_or_create_by(name: "有成员变动", key: "Member")
    self.find_or_create_by(name: "仓库设置被更改", key: "SettingChanged")
  end
end
