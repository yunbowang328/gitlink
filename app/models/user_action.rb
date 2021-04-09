# == Schema Information
#
# Table name: user_actions
#
#  id          :integer          not null, primary key
#  user_id     :integer
#  action_type :string(255)
#  action_id   :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  ip          :string(255)
#
# Indexes
#
#  index_user_actions_on_ip                       (ip)
#  index_user_actions_on_user_id                  (user_id)
#  index_user_actions_on_user_id_and_action_type  (user_id,action_type)
#

class UserAction < ApplicationRecord
end
