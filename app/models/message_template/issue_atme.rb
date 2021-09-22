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

# 在易修中@我
class MessageTemplate::IssueAtme < MessageTemplate 

  # MessageTemplate::IssueAtme.get_message_content(User.where(login: 'yystopf'), User.last, Issue.last)
  def self.get_message_content(receivers, operator, issue)
    project = issue&.project 
    owner = project&.owner 
    content = sys_notice.gsub('{nickname}', operator&.real_name).gsub('{title}', issue&.subject)
    url = notification_url.gsub('{owner}', owner&.login).gsub('{identifier}', project&.identifier).gsub('{id}', issue&.id.to_s)
    return receivers_string(receivers), content, url
  rescue => e
    Rails.logger.info("MessageTemplate::IssueAtme.get_message_content [ERROR] #{e}")
    return 0, '', ''
  end
end
