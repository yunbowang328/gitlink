# == Schema Information
#
# Table name: trackers
#
#  id            :integer          not null, primary key
#  name          :string(30)       default(""), not null
#  is_in_chlog   :boolean          default("0"), not null
#  position      :integer          default("1")
#  is_in_roadmap :boolean          default("1"), not null
#  fields_bits   :integer          default("0")
#

class Tracker < ApplicationRecord
  has_many :issues
  has_and_belongs_to_many :projects
end
