# == Schema Information
#
# Table name: applied_messages
#
#  id              :integer          not null, primary key
#  user_id         :integer
#  applied_id      :integer
#  applied_type    :string(255)
#  viewed          :integer          default("0")
#  status          :integer          default("0")
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  name            :string(255)
#  applied_user_id :integer
#  role            :integer
#  project_id      :integer
#

class AppliedMessage < ApplicationRecord
  belongs_to :user
  belongs_to :applied, polymorphic: true
  belongs_to :project
  belongs_to :applied_user, class_name: 'User'

  enum viewed: {waiting: 0, viewed: 1}
  enum status: {canceled: -1, common: 0, successed: 1, failure: 2} # -1 已取消 0 正在操作 1 操作成功 2 操作失败

end
