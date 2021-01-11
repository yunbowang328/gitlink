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

  def self.build(organization_id, user_id, is_creator)
    self.create!(organization_id: organization_id, user_id: user_id, is_creator: is_creator)
  end
end
