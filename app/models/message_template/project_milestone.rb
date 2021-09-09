# == Schema Information
#
# Table name: message_templates
#
#  id         :integer          not null, primary key
#  type       :string(255)
#  sys_notice :text(65535)
#  email      :text(65535)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

# 我管理的仓库有新的里程碑
class MessageTemplate::ProjectMilestone < MessageTemplate
end
