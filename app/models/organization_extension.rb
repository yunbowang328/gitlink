# == Schema Information
#
# Table name: organization_extensions
#
#  id                            :integer          not null, primary key
#  organization_id               :integer
#  description                   :string(255)
#  website                       :string(255)
#  location                      :string(255)
#  repo_admin_change_team_access :boolean          default("0")
#  visibility                    :integer          default("0")
#  max_repo_creation             :integer          default("-1")
#  created_at                    :datetime         not null
#  updated_at                    :datetime         not null
#  num_projects                  :integer          default("0")
#  num_users                     :integer          default("0")
#
# Indexes
#
#  index_organization_extensions_on_organization_id  (organization_id)
#

class OrganizationExtension < ApplicationRecord

  belongs_to :organization
  has_many :organization_users, foreign_key: :organization_id, primary_key: :organization_id
  has_many :projects, foreign_key: :user_id, primary_key: :organization_id

  enum visibility: {common: 0, limited: 1, privacy: 2}

  def self.build(organization_id, description, website, location, repo_admin_change_team_access, visibility, max_repo_creation)
    self.create!(organization_id: organization_id,
                 description: description,
                 website: website,
                 location: location,
                 repo_admin_change_team_access: repo_admin_change_team_access,
                 visibility: visibility,
                 max_repo_creation: max_repo_creation)
  end
end
