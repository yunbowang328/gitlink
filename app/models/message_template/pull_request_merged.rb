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

# 我创建或负责的合并请求被合并
class MessageTemplate::PullRequestMerged < MessageTemplate

  # MessageTemplate::PullRequestMerged.get_message_content(User.where(login: 'yystopf'), User.last, PullRequest.last)
  def self.get_message_content(receivers, operator, pull_request)
    project = pull_request&.project 
    owner = project&.owner 
    content = sys_notice.gsub('{title}', pull_request&.title)
    url = notification_url.gsub('{owner}', owner&.login).gsub('{identifier}', project&.identifier).gsub('{id}', pull_request&.id.to_s)
    return receivers_string(receivers), content, url
  rescue => e
    Rails.logger.info("MessageTemplate::PullRequestMerged.get_message_content [ERROR] #{e}")
    return '', '', ''
  end
end
