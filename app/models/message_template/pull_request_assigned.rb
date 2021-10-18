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

# 有新指派给我的合并请求
class MessageTemplate::PullRequestAssigned < MessageTemplate

  # MessageTemplate::PullRequestAssigned.get_message_content(User.where(login: 'yystopf'), User.last, PullRequest.last)
  def self.get_message_content(receivers, operator, pull_request)
    receivers.each do |receiver|
      if receiver.user_template_message_setting.present? 
        receivers = receivers.where.not(id: receiver.id) unless receiver.user_template_message_setting.notification_body["CreateOrAssign::PullRequestAssigned"]
      end
    end
    return '', '', '' if receivers.blank?
    project = pull_request&.project 
    owner = project&.owner 
    content = sys_notice.gsub('{nickname1}', operator&.real_name).gsub('{nickname2}', owner&.real_name).gsub('{repository}', project&.name).gsub('{title}', pull_request&.title)
    url = notification_url.gsub('{owner}', owner&.login).gsub('{identifier}', project&.identifier).gsub('{id}', pull_request&.id.to_s)
    return receivers_string(receivers), content, url
  rescue => e
    Rails.logger.info("MessageTemplate::PullRequestAssigned.get_message_content [ERROR] #{e}")
    return '', '', ''
  end

  def self.get_email_message_content(receiver, operator, pull_request)
    if receiver.user_template_message_setting.present? 
      return '', '', '' unless receiver.user_template_message_setting.email_body["CreateOrAssign::PullRequestAssigned"]
    end
    project = pull_request&.project
    owner = project&.owner 
    title = email_title
    title.gsub!('{nickname1}', operator&.real_name)
    title.gsub!('{nickname2}', owner&.real_name)
    title.gsub!('{repository}', project&.name)
    content = email
    content.gsub!('{receiver}', receiver&.real_name)
    content.gsub!('{nickname1}', operator&.real_name)
    content.gsub!('{login1}', operator&.login)
    content.gsub!('{nickname2}', owner&.real_name)
    content.gsub!('{login2}', owner&.login)
    content.gsub!('{identifier}', project&.identifier)
    content.gsub!('{repository}', project&.name)
    content.gsub!('{baseurl}', base_url)
    content.gsub!('{title}', pull_request&.title)
    content.gsub!('{id}', pull_request&.id.to_s)

    return receiver&.mail, title, content
  rescue => e
    Rails.logger.info("MessageTemplate::PullRequestAssigned.get_email_message_content [ERROR] #{e}")
    return '', '', ''
  end
end
