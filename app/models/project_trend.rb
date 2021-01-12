# == Schema Information
#
# Table name: project_trends
#
#  id          :integer          not null, primary key
#  user_id     :integer
#  project_id  :integer
#  trend_type  :string(255)
#  trend_id    :integer
#  action_type :string(255)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_project_trends_on_trend_type_and_trend_id  (trend_type,trend_id)
#  index_project_trends_on_user_id_and_project_id   (user_id,project_id)
#

class ProjectTrend < ApplicationRecord
  CLOSE  = 'close'
  CREATE = 'create'

  belongs_to :project
  belongs_to :trend, polymorphic: true, optional: true
  belongs_to :user
end
