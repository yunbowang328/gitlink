# == Schema Information
#
# Table name: project_details
#
#  id         :integer          not null, primary key
#  project_id :integer
#  content    :text(4294967295)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_project_details_on_project_id  (project_id)
#

class ProjectDetail < ApplicationRecord
  belongs_to :project, optional: true
  has_many :attachments, as: :container, dependent: :destroy
end
