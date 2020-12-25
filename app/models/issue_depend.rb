# == Schema Information
#
# Table name: issue_depends
#
#  id              :integer          not null, primary key
#  user_id         :integer
#  issue_id        :integer
#  depend_issue_id :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_issue_depends_on_user_id_and_issue_id_and_depend_issue_id  (user_id,issue_id,depend_issue_id)
#

class IssueDepend < ApplicationRecord
  belongs_to :issue
end
