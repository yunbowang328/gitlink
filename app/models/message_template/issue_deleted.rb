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

# 我创建或负责的易修删除
class MessageTemplate::IssueDeleted < MessageTemplate 

  # MessageTemplate::IssueDeleted.get_message_content(User.where(login: 'yystopf'), User.last, "hahah")
  def self.get_message_content(receivers, operator, issue_title)
    receivers.each do |receiver|
      if receiver.user_template_message_setting.present? 
        receivers = receivers.where.not(id: receiver.id) unless receiver.user_template_message_setting.notification_body["CreateOrAssign::IssueChanged"]
      end
    end
    return '', '', '' if receivers.blank?
    content = sys_notice.gsub('{nickname}', operator&.real_name).gsub('{title}', issue_title)
    return receivers_string(receivers), content, notification_url
  rescue => e
    Rails.logger.info("MessageTemplate::IssueDeleted.get_message_content [ERROR] #{e}")
    return '', '', ''
  end

  def self.get_email_message_content(receiver, operator, issue_title)
    if receiver.user_template_message_setting.present? 
      return '', '', '' unless receiver.user_template_message_setting.email_body["CreateOrAssign::IssueChanged"]
      title = email_title
      title.gsub!('{title}', issue_title)
      content = email
      content.gsub!('{receiver}', receiver&.real_name)
      content.gsub!('{nickname}', operator&.real_name)
      content.gsub!('{login}', operator&.login)
      content.gsub!('{baseurl}', base_url)
      content.gsub!('{title}', issue_title)

      return receiver&.mail, title, content
    else
      return '', '', ''
    end
  rescue => e
    Rails.logger.info("MessageTemplate::IssueDeleted.get_email_message_content [ERROR] #{e}")
    return '', '', ''
  end
end
