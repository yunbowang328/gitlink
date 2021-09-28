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

# TODO 我管理/关注的仓库有新的合并请求
class MessageTemplate::ProjectPullRequest < MessageTemplate

  # MessageTemplate::ProjectPullRequest.get_message_content(User.where(login: 'yystopf'), User.where(login: 'testforge2'), User.last, PullRequest.last)
  def self.get_message_content(managers, followers, operator, pull_request)
    project = pull_request&.project 
    owner = project&.owner 
    receivers = managers + followers
    content = sys_notice.gsub('{nickname1}', operator&.real_name).gsub('{nickname2}', owner&.real_name).gsub('{repository}', project&.name).gsub('{title}', pull_request&.title)
    url = notification_url.gsub('{owner}', owner&.login).gsub('{identifier}', project&.identifier).gsub('{id}', pull_request&.id.to_s)

    return receivers_string(receivers), content, url
  rescue => e
    Rails.logger.info("MessageTemplate::ProjectPullRequest.get_message_content [ERROR] #{e}")
    return '', '', ''
  end

  def self.get_email_message_content(receiver, is_manager, operator, pull_request)
    project = pull_request&.project 
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
    content.gsub!('{id}', pull_request&.id.to_s)
    content.gsub!('{title}', pull_request&.title)
    
    return receiver&.mail, title, content
  rescue => e
    Rails.logger.info("MessageTemplate::ProjectPullRequest.get_email_message_content [ERROR] #{e}")
    return '', '', ''
  end
end
