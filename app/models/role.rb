# == Schema Information
#
# Table name: roles
#
#  id                :integer          not null, primary key
#  name              :string(30)       default(""), not null
#  position          :integer          default("1")
#  assignable        :boolean          default("1")
#  builtin           :integer          default("0"), not null
#  permissions       :text(65535)
#  issues_visibility :string(30)       default("default"), not null
#

class Role < ApplicationRecord
  has_many :member_roles, dependent: :destroy
end
