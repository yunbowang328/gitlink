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

class TemplateMessageSetting::Normal < TemplateMessageSetting 

  def self.type_name 
    ""
  end

  def self.order_index 
    10
  end

  def self.build_init_data
    self.find_or_create_by(name: "被拉入或移出组织", key: "Organization")
    self.find_or_create_by(name: "被拉入或移出项目", key: "Project")
    self.find_or_create_by(name: "有权限变更", key: "Permission")
  end
end
