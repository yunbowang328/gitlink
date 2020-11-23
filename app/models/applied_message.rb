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

end
