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

# 被关注提示
class MessageTemplate::FollowedTip < MessageTemplate

  # MessageTemplate::FollowedTip.get_message_content(User.where(login: 'yystopf'), User.last)
  def self.get_message_content(receivers, followeder)
    return receivers_string(receivers), sys_notice.gsub('{nickname}', followeder&.real_name), notification_url.gsub('{login}', followeder.login)
  rescue 
    return '', '', ''
  end
end
