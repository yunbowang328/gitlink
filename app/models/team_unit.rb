# == Schema Information
#
# Table name: team_units
#
#  id              :integer          not null, primary key
#  organization_id :integer
#  team_id         :integer
#  unit_type       :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_team_units_on_organization_id  (organization_id)
#  index_team_units_on_team_id          (team_id)
#

class TeamUnit < ApplicationRecord

  belongs_to :organization
  belongs_to :team

  enum unit_type: {code: 1, issue: 2, pull_request: 3, releases: 4}

  validates :unit_type, uniqueness: { scope: [:organization_id, :team_id]}

  def self.build(organization_id, team_id, unit_type)
    self.create!(organization_id: organization_id, team_id: team_id, unit_type: unit_type)
  end

  def self.build_owner(organization_id, team_id)
    self.unit_types.keys.each do |u_type|
      self.build(organization_id, team_id, u_type)
    end
  end
end
