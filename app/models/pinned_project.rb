# == Schema Information
#
# Table name: pinned_projects
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  project_id :integer
#  position   :integer          default("0")
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_pinned_projects_on_project_id  (project_id)
#  index_pinned_projects_on_user_id     (user_id)
#

class PinnedProject < ApplicationRecord

  belongs_to :user 
  belongs_to :project 
end
