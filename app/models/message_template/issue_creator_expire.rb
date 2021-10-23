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

# 我创建的易修截止日期到达最后一天
class MessageTemplate::IssueCreatorExpire < MessageTemplate

  # MessageTemplate::IssueCreatorExpire.get_message_content(User.where(login: 'yystopf'), Issue.last)
  def self.get_message_content(receivers, issue)
    project = issue&.project
    owner = project&.owner
    content = sys_notice.gsub('{title}', issue&.subject)
    url = notification_url.gsub('{owner}', owner&.login).gsub('{identifier}', project&.identifier).gsub('{id}', issue&.id.to_s)
    return receivers_string(receivers), content, url
  rescue => e
    Rails.logger.info("MessageTemplate::IssueAssignerExpire.get_message_content [ERROR] #{e}")
    return '', '', ''
  end
end
