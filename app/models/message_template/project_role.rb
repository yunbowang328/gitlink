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

# 账号仓库权限变更
class MessageTemplate::ProjectRole < MessageTemplate

  # MessageTemplate::ProjectRole.get_message_content(User.where(login: 'yystopf'), Project.last, '管理员')
  def self.get_message_content(receivers, project, role)
    receivers.each do |receiver|
      if receiver.user_template_message_setting.present? 
        receivers = receivers.where.not(id: receiver.id) unless receiver.user_template_message_setting.notification_body["Normal::Permission"]
      end
    end
    return '', '', '' if receivers.blank?
    content = sys_notice.gsub('{repository}', project&.name).gsub('{role}', role)
    url = notification_url.gsub('{owner}', project&.owner&.login).gsub('{identifier}', project&.identifier)
    return receivers_string(receivers), content, url
  rescue => e
    Rails.logger.info("MessageTemplate::ProjectRole.get_message_content [ERROR] #{e}")
    return '', '', ''
  end

  def self.get_email_message_content(receiver, project, role)
    if receiver.user_template_message_setting.present? 
      return '', '', '' unless receiver.user_template_message_setting.email_body["Normal::Permission"]
    end
    title = email_title
    title.gsub!('{repository}', project&.name)
    title.gsub!('{role}', role)
    content = email 
    content.gsub!('{receiver}', receiver&.real_name)
    content.gsub!('{baseurl}', base_url)
    content.gsub!('{login}', project&.owner&.login)
    content.gsub!('{identifier}', project&.identifier)
    content.gsub!('{repository}', project&.name)
    content.gsub!('{role}', role)

    return receiver&.mail, title, content
  rescue => e
    Rails.logger.info("MessageTemplate::ProjectRole.get_email_message_content [ERROR] #{e}")
    return '', '', ''
  end
end
