# == Schema Information
#
# Table name: member_roles
#
#  id             :integer          not null, primary key
#  member_id      :integer          not null
#  role_id        :integer          not null
#  inherited_from :integer
#  is_current     :integer          default("1")
#
# Indexes
#
#  index_member_roles_on_member_id  (member_id)
#  index_member_roles_on_role_id    (role_id)
#

class MemberRole < ApplicationRecord
  belongs_to :role
  belongs_to :member

  validates :member_id, :role_id, presence: true
end
