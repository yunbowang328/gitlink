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

# 我管理的仓库有成员加入
class MessageTemplate::ProjectMemberJoined < MessageTemplate

  # MessageTemplate::ProjectMemberJoined.get_message_content(User.where(login: 'yystopf'))
  def self.get_message_content(receivers, user, project)
    receivers.each do |receiver|
      if receiver.user_template_message_setting.present? 
        receivers = receivers.where.not(id: receiver.id) unless receiver.user_template_message_setting.notification_body["ManageProject::Member"]
      end
    end
    return '', '', '' if receivers.blank?
    content = sys_notice.gsub('{nickname1}', user&.real_name).gsub('{nickname2}', project&.owner&.real_name).gsub('{repository}', project&.name)
    url = notification_url.gsub('{owner}', project&.owner&.login).gsub('{identifier}', project&.identifier)
    return receivers_string(receivers), content, url
  rescue => e
    Rails.logger.info("MessageTemplate::ProjectMemberJoined.get_message_content [ERROR] #{e}")
    return '', '', ''
  end

  def self.get_email_message_content(receiver, user, project)
    if receiver.user_template_message_setting.present? 
      return '', '', '' unless receiver.user_template_message_setting.email_body["ManageProject::Member"]
    end
    title = email_title
    title.gsub!('{nickname1}', user&.real_name)
    title.gsub!('{nickname2}', project&.owner&.real_name)
    title.gsub!('{repository}', project&.name)
    
    content = email
    content.gsub!('{receiver}', receiver&.real_name)
    content.gsub!('{baseurl}', base_url)
    content.gsub!('{login1}', user&.login)
    content.gsub!('{login2}', project&.owner&.login)
    content.gsub!('{identifier}', project&.identifier)
    content.gsub!('{nickname1}', user&.real_name)
    content.gsub!('{nickname2}', project&.owner&.real_name)
    content.gsub!('{repository}', project&.name)

    return receiver&.mail, title, content
  rescue => e
    Rails.logger.info("MessageTemplate::ProjectMemberJoined.get_email_message_content [ERROR] #{e}")
    return '', '', ''
  end
end
