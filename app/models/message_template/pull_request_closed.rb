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

# 我创建或负责的合并请求被关闭
class MessageTemplate::PullRequestClosed < MessageTemplate

  # MessageTemplate::PullRequestClosed.get_message_content(User.where(login: 'yystopf'), User.last, PullRequest.last)
  def self.get_message_content(receivers, operator, pull_request)
    project = pull_request&.project 
    owner = project&.owner 
    content = sys_notice.gsub('{title}', pull_request&.title)
    url = notification_url
    return receivers_string(receivers), content, url
  rescue => e
    Rails.logger.info("MessageTemplate::PullRequestClosed.get_message_content [ERROR] #{e}")
    return '', '', ''
  end
end
