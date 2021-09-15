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

# 我创建或负责的易修删除
class MessageTemplate::IssueDeleted < MessageTemplate 

  # MessageTemplate::IssueDeleted.get_message_content(User.where(login: 'yystopf'), User.last, "hahah")
  def self.get_message_content(receivers, operator, issue_title)
    content = sys_notice.gsub('{nickname}', operator&.nickname).gsub('{title}', issue_title)
    return receivers_string(receivers), content, notification_url
  rescue => e
    Rails.logger.info("MessageTemplate::IssueAtme.get_message_content [ERROR] #{e}")
    return '', '', ''
  end
end
