# == Schema Information
#
# Table name: forge_activities
#
#  id             :integer          not null, primary key
#  user_id        :integer
#  project_id     :integer
#  forge_act_id   :integer
#  forge_act_type :string(255)
#  org_id         :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
# Indexes
#
#  forge_act_index                         (project_id,forge_act_id,created_at,forge_act_type)
#  index_forge_activities_on_forge_act_id  (forge_act_id)
#

class ForgeActivity < ApplicationRecord
  belongs_to :user
  belongs_to :project
  belongs_to :forge_act, polymorphic: true
end
