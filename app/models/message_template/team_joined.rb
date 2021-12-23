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

# 账号被拉入组织团队
class MessageTemplate::TeamJoined < MessageTemplate

  # MessageTemplate::TeamJoined.get_message_content(User.where(login: 'yystopf'), Organization.last, Organization.last.teams.take)
  def self.get_message_content(receivers, organization, team)
    receivers.each do |receiver|
      if receiver.user_template_message_setting.present? 
        receivers = receivers.where.not(id: receiver.id) unless receiver.user_template_message_setting.notification_body["Normal::Permission"]
      end
    end
    return '', '', '' if receivers.blank?
    content = sys_notice.gsub('{organization}', organization&.real_name).gsub('{team}', team&.nickname).gsub('{role}', team&.authorize_name)
    url = notification_url.gsub('{login}', organization&.login)
    return receivers_string(receivers), content, url
  rescue => e
    Rails.logger.info("MessageTemplate::TeamJoined.get_message_content [ERROR] #{e}")
    return '', '', ''
  end

  def self.get_email_message_content(receiver, organization, role) 
    if receiver.user_template_message_setting.present? 
      return '', '', '' unless receiver.user_template_message_setting.email_body["Normal::Permission"]
      title = email_title
      title.gsub!('{organization}', organization&.real_name)
      title.gsub!('{team}', team&.nickname)
      title.gsub!('{role}', team&.authorize_name)
      content = email 
      content.gsub!('{receiver}', receiver&.real_name)
      content.gsub!('{baseurl}', base_url)
      content.gsub!('{login}', organization&.login)
      content.gsub!('{organization}', organization&.real_name)
      content.gsub!('{team}', team&.nickname)
      content.gsub!('{role}', team&.authorize_name)
  
      return receiver&.mail, title, content
    else
      return '', '', ''
    end

  rescue => e
    Rails.logger.info("MessageTemplate::TeamJoined.get_email_message_content [ERROR] #{e}")
    return '', '', ''
  end
end
