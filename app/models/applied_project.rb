# == Schema Information
#
# Table name: forge_applied_projects
#
#  id         :integer          not null, primary key
#  project_id :integer
#  user_id    :integer
#  role       :integer          default("0")
#  status     :integer          default("0")
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_forge_applied_projects_on_project_id  (project_id)
#  index_forge_applied_projects_on_user_id     (user_id)
#

class AppliedProject < ApplicationRecord
  self.table_name = "forge_applied_projects"
  belongs_to :user
  belongs_to :project

  has_many :applied_messages, as: :applied, dependent: :destroy
  # has_many :forge_activities, as: :forge_act, dependent: :destroy

  enum role: {manager: 3, developer: 4, reporter: 5}
  enum status: {canceled: -1, common: 0, accepted: 1, refused: 2} # -1 已取消 0 待操作 1 已接收 2 已拒绝

end
