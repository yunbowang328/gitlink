class ProjectTrend < ApplicationRecord
  belongs_to :project
  belongs_to :trend, polymorphic: true, optional: true
  belongs_to :user
end
