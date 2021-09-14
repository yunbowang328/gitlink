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

# 有新指派给我的合并请求
class MessageTemplate::PullRequestAssigned < MessageTemplate

  # MessageTemplate::PullRequestAssigned.get_message_content(User.where(login: 'yystopf'), User.last, PullRequest.last)
  def self.get_message_content(receivers, operator, pull_request)
    project = pull_request&.project 
    owner = project&.owner 
    content = sys_notice.gsub('{nickname1}', operator&.nickname).gsub('{nickname2}', owner&.nickname).gsub('{repository}', project&.name).gsub('{title}', pull_request&.title)
    url = notification_url.gsub('{owner}', owner&.login).gsub('{identifier}', project&.identifier).gsub('{id}', pull_request&.id.to_s)
    return receivers_string(receivers), content, url
  rescue => e
    Rails.logger.info("MessageTemplate::PullRequestAssigned.get_message_content [ERROR] #{e}")
    return '', '', ''
  end
end
