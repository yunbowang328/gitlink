# == Schema Information
#
# Table name: issue_times
#
#  id         :integer          not null, primary key
#  issue_id   :integer
#  user_id    :integer
#  start_time :datetime
#  end_time   :datetime
#  cost_time  :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_issue_times_on_issue_id_and_user_id  (issue_id,user_id)
#

class IssueTime < ApplicationRecord
  belongs_to :issue
  belongs_to :user
end
