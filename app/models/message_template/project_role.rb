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

# 账号仓库权限变更
class MessageTemplate::ProjectRole < MessageTemplate

  # MessageTemplate::ProjectRole.get_message_content(User.where(login: 'yystopf'), Project.last, '管理员')
  def self.get_message_content(receivers, project, role)
    content = sys_notice.gsub('{repository}', project&.name).gsub('{role}', role)
    url = notification_url.gsub('{owner}', project&.owner&.login).gsub('{identifier}', project&.identifier)
    return receivers_string(receivers), content, url
  rescue => e
    Rails.logger.info("MessageTemplate::ProjectRole.get_message_content [ERROR] #{e}")
    return '', '', ''
  end
end
