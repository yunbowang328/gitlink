# == Schema Information
#
# Table name: message_templates
#
#  id               :integer          not null, primary key
#  type             :string(255)
#  sys_notice       :text(65535)
#  email            :text(65535)
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  notification_url :string(255)
#

# 账号被移出组织
class MessageTemplate::OrganizationLeft < MessageTemplate

  # MessageTemplate::OrganizationLeft.get_message_content(User.where(login: 'yystopf'), Organization.last)
  def self.get_message_content(receivers, organization)
    content = sys_notice.gsub('{organization}', organization&.name)
    url = notification_url.gsub('{login}', organization&.name)
    return receivers_string(receivers), content, url
  rescue => e
    Rails.logger.info("MessageTemplate::OrganizationLeft.get_message_content [ERROR] #{e}")
    return '', '', ''
  end
end
