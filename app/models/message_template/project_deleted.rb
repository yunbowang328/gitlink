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

# TODO 我关注的仓库被删除
class MessageTemplate::ProjectDeleted < MessageTemplate

  # MessageTemplate::ProjectDeleted.get_message_content(User.where(login: 'yystopf'))
  def self.get_message_content(receivers)
    return receivers_string(receivers), content, url
  rescue => e
    Rails.logger.info("MessageTemplate::ProjectDeleted.get_message_content [ERROR] #{e}")
    return '', '', ''
  end
end
