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

# TODO 我管理/关注的仓库有新的易修
class MessageTemplate::ProjectIssue < MessageTemplate

  # MessageTemplate::ProjectIssue.get_message_content(User.where(login: 'yystopf'), User.where(login: 'forgetest1'), User.last, Issue.last)
  def self.get_message_content(managers, followers, operator, issue)
    project = issue&.project 
    owner = project&.owner 
    receivers = managers + followers
    content = sys_notice.gsub('{nickname1}', operator&.real_name).gsub('{nickname2}', owner&.real_name).gsub('{repository}', project&.name).gsub('{title}', issue&.subject)
    url = notification_url.gsub('{owner}', owner&.login).gsub('{identifier}', project&.identifier).gsub('{id}', issue&.id.to_s)
    
    return receivers_string(receivers), content, url
  rescue => e
    Rails.logger.info("MessageTemplate::ProjectIssue.get_message_content [ERROR] #{e}")
    return '', '', ''
  end

  def self.get_email_message_content(managers, followers, operator, issue)
    project = issue&.project 
    owner = project&.owner 
    receivers = managers + followers
    content = email.gsub('{nickname1}', operator&.real_name).gsub('{nickname2}', owner&.real_name).gsub('{repository}', project&.name).gsub('{title}', issue&.subject)
    url = notification_url.gsub('{owner}', owner&.login).gsub('{identifier}', project&.identifier).gsub('{id}', issue&.id.to_s)
    
    return receivers_email_string(receivers), content, url
  rescue => e
    Rails.logger.info("MessageTemplate::ProjectIssue.get_email_message_content [ERROR] #{e}")
    return '', '', ''
  end
end
