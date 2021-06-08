# == Schema Information
#
# Table name: applied_projects
#
#  id         :integer          not null, primary key
#  project_id :integer          not null
#  user_id    :integer          not null
#  role       :integer          default("0")
#  status     :integer          default("0")
#

class AppliedProject < ApplicationRecord
  belongs_to :user
  belongs_to :project

  has_many :applied_messages, as: :applied, dependent: :destroy
  # has_many :forge_activities, as: :forge_act, dependent: :destroy

  enum status: {canceled: -1, common: 0, accepted: 1, refused: 2} # -1 已取消 0 待操作 1 已接收 2 已拒绝

end
