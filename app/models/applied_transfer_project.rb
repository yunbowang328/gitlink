# == Schema Information
#
# Table name: applied_transfer_projects
#
#  id         :integer          not null, primary key
#  project_id :integer
#  owner_id   :integer
#  user_id    :integer
#  status     :integer          default("0")
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_applied_transfer_projects_on_owner_id    (owner_id)
#  index_applied_transfer_projects_on_project_id  (project_id)
#  index_applied_transfer_projects_on_user_id     (user_id)
#

class AppliedTransferProject < ApplicationRecord
  belongs_to :project
  belongs_to :user # 操作者
  belongs_to :owner # 接收个人或组织

  has_many :applied_messages, as: :applied, dependent: :destroy

  enum status: {canceled: -1, common: 0, accepted: 1, refused: 2} # -1 已取消 0 待操作 1 已接收 2 已拒绝
end
