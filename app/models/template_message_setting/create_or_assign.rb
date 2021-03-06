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

#我创建的或负责的
class TemplateMessageSetting::CreateOrAssign < TemplateMessageSetting 

  def self.type_name 
    "我创建的或负责的"
  end

  def self.order_index
    20
  end

  def self.build_init_data
    self.find_or_create_by(name: "易修状态变更", key: "IssueChanged")
    self.find_or_create_by(name: "合并请求状态变更", key: "PullRequestChanged")
  end
end
