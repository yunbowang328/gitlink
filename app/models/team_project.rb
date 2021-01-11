# == Schema Information
#
# Table name: team_projects
#
#  id              :integer          not null, primary key
#  organization_id :integer
#  project_id      :integer
#  team_id         :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_team_projects_on_organization_id  (organization_id)
#  index_team_projects_on_project_id       (project_id)
#  index_team_projects_on_team_id          (team_id)
#

class TeamProject < ApplicationRecord

  belongs_to :organization
  belongs_to :project
  belongs_to :team, counter_cache: :num_projects

  def self.build(organization_id, team_id, project_id)
    self.create!(organization_id: organization_id, team_id: team_id, project_id: project_id)
  end
end
