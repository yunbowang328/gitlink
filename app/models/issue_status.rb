# == Schema Information
#
# Table name: issue_statuses
#
#  id                 :integer          not null, primary key
#  name               :string(30)       default(""), not null
#  is_closed          :boolean          default("0"), not null
#  is_default         :boolean          default("0"), not null
#  position           :integer          default("1")
#  default_done_ratio :integer
#
# Indexes
#
#  index_issue_statuses_on_is_closed   (is_closed)
#  index_issue_statuses_on_is_default  (is_default)
#  index_issue_statuses_on_position    (position)
#

class IssueStatus < ApplicationRecord
  has_many :issues
  belongs_to :project, optional: true
end
