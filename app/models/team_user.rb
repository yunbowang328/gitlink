# == Schema Information
#
# Table name: team_users
#
#  id              :integer          not null, primary key
#  organization_id :integer
#  team_id         :integer
#  user_id         :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_team_users_on_organization_id  (organization_id)
#  index_team_users_on_team_id          (team_id)
#  index_team_users_on_user_id          (user_id)
#

class TeamUser < ApplicationRecord

  belongs_to :organization
  belongs_to :team, counter_cache: :num_users
  belongs_to :user

  has_one :member

  validates :user_id, uniqueness: {scope: [:organization_id, :team_id]}

  before_destroy :remove_project_member

  def self.build(organization_id, user_id, team_id)
    self.create!(organization_id: organization_id, user_id: user_id, team_id: team_id)
  end

  def remove_project_member
    member.destroy if member.present? 
  end
end
