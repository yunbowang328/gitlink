# == Schema Information
#
# Table name: forge_applied_messages
#
#  id              :integer          not null, primary key
#  user_id         :integer
#  applied_type    :string(255)
#  applied_id      :integer
#  viewed          :integer          default("0")
#  status          :integer          default("0")
#  name            :string(255)
#  applied_user_id :integer
#  role            :integer
#  project_id      :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_forge_applied_messages_on_applied_type_and_applied_id  (applied_type,applied_id)
#  index_forge_applied_messages_on_applied_user_id              (applied_user_id)
#  index_forge_applied_messages_on_project_id                   (project_id)
#  index_forge_applied_messages_on_user_id                      (user_id)
#

class AppliedMessage < ApplicationRecord
  self.table_name = 'forge_applied_messages'
  belongs_to :user
  belongs_to :applied, polymorphic: true
  belongs_to :project
  belongs_to :applied_user, class_name: 'User'

  enum viewed: {waiting: 0, viewed: 1}
  enum status: {canceled: -1, common: 0, successed: 1, failure: 2} # -1 已取消 0 正在操作 1 操作成功 2 操作失败

end
