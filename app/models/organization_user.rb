# == Schema Information
#
# Table name: organization_users
#
#  id              :integer          not null, primary key
#  user_id         :integer
#  organization_id :integer
#  is_creator      :boolean          default("0")
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_organization_users_on_organization_id  (organization_id)
#  index_organization_users_on_user_id          (user_id)
#

class OrganizationUser < ApplicationRecord

  belongs_to :organization
  belongs_to :user

  validates :user_id, uniqueness: {scope: :organization_id}

  def self.build(organization_id, user_id, is_creator = false)
    org_user = self.find_by(organization_id: organization_id, user_id: user_id)
    return org_user unless org_user.nil?
    self.create!(organization_id: organization_id, user_id: user_id, is_creator: is_creator)
  end

  def teams
    organization.teams.joins(:team_users).where(team_users: {user_id: user_id})
  end
end
