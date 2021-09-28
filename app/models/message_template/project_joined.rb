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

# 账号被拉入项目
class MessageTemplate::ProjectJoined < MessageTemplate

  # MessageTemplate::ProjectJoined.get_message_content(User.where(login: 'yystopf'), Project.last)
  def self.get_message_content(receivers, project)
    content = sys_notice.gsub('{repository}', project&.name)
    url = notification_url.gsub('{owner}', project&.owner&.login).gsub('{identifier}', project&.identifier)
    return receivers_string(receivers), content, url
  rescue => e
    Rails.logger.info("MessageTemplate::ProjectJoined.get_message_content [ERROR] #{e}")
    return '', '', ''
  end

  def self.get_email_message_content(receiver, project) 
    title = email_title
    title.gsub!('{repository}', project&.name)
    
    content = email
    content.gsub!('{receiver}', receiver&.real_name)
    content.gsub!('{baseurl}', base_url)
    content.gsub!('{login}', project&.owner&.login)
    content.gsub!('{identifier}', project&.identifier)
    content.gsub!('{nickname}', project&.owner&.real_name)
    content.gsub!('{repository}', project&.name)

    return receiver&.mail, title, content
  rescue => e
    Rails.logger.info("MessageTemplate::ProjectJoined.get_email_message_content [ERROR] #{e}")
    return '', '', ''
  end
end
