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
#  email_title      :string(255)
#

# 账号组织权限变更
class MessageTemplate::OrganizationRole < MessageTemplate

  # MessageTemplate::OrganizationRole.get_message_content(User.where(login: 'yystopf'), Organization.last, '管理员')
  def self.get_message_content(receivers, organization, role)
    content = sys_notice.gsub('{organization}', organization&.real_name).gsub('{role}', role)
    url = notification_url.gsub('{login}', organization&.login)
    return receivers_string(receivers), content, url
  rescue => e
    Rails.logger.info("MessageTemplate::OrganizationRole.get_message_content [ERROR] #{e}")
    return '', '', ''
  end

  def self.get_email_message_content(receiver, organization, role) 
    title = email_title
    title.gsub!('{organization}', organization&.real_name)
    title.gsub!('{role}', role)
    content = email 
    content.gsub!('{receiver}', receiver&.real_name)
    content.gsub!('{baseurl}', base_url)
    content.gsub!('{login}', organization&.login)
    content.gsub!('{organization}', organization&.real_name)
    content.gsub!('{role}', role)

    return receiver&.mail, title, content
  rescue => e
    Rails.logger.info("MessageTemplate::OrganizationRole.get_email_message_content [ERROR] #{e}")
    return '', '', ''
  end
end
