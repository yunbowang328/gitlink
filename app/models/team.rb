# == Schema Information
#
# Table name: teams
#
#  id                     :integer          not null, primary key
#  organization_id        :integer
#  name                   :string(255)
#  description            :string(255)
#  authorize              :integer          default("0")
#  num_projects           :integer          default("0")
#  num_users              :integer          default("0")
#  includes_all_project   :boolean          default("0")
#  can_create_org_project :boolean          default("0")
#  gtid                   :integer
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_teams_on_organization_id  (organization_id)
#

class Team < ApplicationRecord

  belongs_to :organization
  has_many :team_projects, dependent: :destroy
  has_many :team_units, dependent: :destroy
  has_many :team_users, dependent: :destroy

  validates :name, uniqueness: {scope: :organization_id}

  enum authorize: {common: 0, read: 1, write: 2, admin: 3, owner: 4}

  def self.build(organization_id, name, description, authorize, includes_all_project, can_create_org_project)
    self.create!(organization_id: organization_id,
                 name: name,
                 description: description,
                 authorize: authorize,
                 includes_all_project: includes_all_project,
                 can_create_org_project: can_create_org_project)
  end

  def setup_team_project!
    return unless includes_all_project
    organization.projects.each do |project|
      TeamProject.build(organization.id, id, project.id)
    end
  end

  def is_member?(user_id)
    team_users.where(user_id: user_id).present?
  end

end
