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

# TODO 我管理/关注的仓库有新的易修
class MessageTemplate::ProjectIssue < MessageTemplate

  # MessageTemplate::ProjectIssue.get_message_content(User.where(login: 'yystopf'), User.where(login: 'forgetest1'), User.last, Issue.last)
  def self.get_message_content(managers, followers, operator, issue)
    managers.each do |receiver|
      if receiver.user_template_message_setting.present? 
        managers = managers.where.not(id: receiver.id) unless receiver.user_template_message_setting.notification_body["ManageProject::Issue"]
      end
    end
    project = issue&.project 
    owner = project&.owner 
    receivers = managers + followers
    return '', '', '' if receivers.blank?
    content = sys_notice.gsub('{nickname1}', operator&.real_name).gsub('{nickname2}', owner&.real_name).gsub('{repository}', project&.name).gsub('{title}', issue&.subject)
    url = notification_url.gsub('{owner}', owner&.login).gsub('{identifier}', project&.identifier).gsub('{id}', issue&.id.to_s)
    
    return receivers_string(receivers), content, url
  rescue => e
    Rails.logger.info("MessageTemplate::ProjectIssue.get_message_content [ERROR] #{e}")
    return '', '', ''
  end

  def self.get_email_message_content(receiver, is_manager, operator, issue)
    if receiver.user_template_message_setting.present? && is_manager
      return '', '', '' unless receiver.user_template_message_setting.email_body["ManageProject::Issue"]
    end
    project = issue&.project 
    owner = project&.owner 
    title = email_title
    title.gsub!('{nickname1}', operator&.real_name)
    title.gsub!('{nickname2}', owner&.real_name)
    title.gsub!('{repository}', project&.name)

    content = email 
    content.gsub!('{receiver}', receiver&.real_name)
    content.gsub!('{baseurl}', base_url)
    content.gsub!('{login1}', operator&.login)
    content.gsub!('{nickname1}', operator&.real_name)
    content.gsub!('{nickname2}', owner&.real_name)
    content.gsub!('{repository}', project&.name)
    content.gsub!('{login2}', owner&.login)
    content.gsub!('{identifier}', project&.identifier)
    content.gsub!('{id}', issue&.id.to_s)
    content.gsub!('{title}', issue&.subject)
    
    return receiver&.mail, title, content
  rescue => e
    Rails.logger.info("MessageTemplate::ProjectIssue.get_email_message_content [ERROR] #{e}")
    return '', '', ''
  end
end
