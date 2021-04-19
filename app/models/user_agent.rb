# == Schema Information
#
# Table name: user_agents
#
#  id              :integer          not null, primary key
#  agent_type      :string(255)
#  key             :string(255)
#  ip              :string(255)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  register_status :integer          default("0")
#  action_status   :integer          default("0")
#  is_delete       :boolean          default("0")
#  user_id         :integer
#
# Indexes
#
#  index_user_agents_on_ip       (ip)
#  index_user_agents_on_user_id  (user_id)
#

class UserAgent < ApplicationRecord
  has_many :user_actions, :foreign_key => "ip", :primary_key => "ip"
  USER_AD = 1  # 广告宣传的引流
  USER_REGISTER = 2 # 引流注册
  USER_COMPETITION = 3 # 引流参加竞赛
end
