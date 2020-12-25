# == Schema Information
#
# Table name: issue_priorities
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  position   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_issue_priorities_on_name  (name)
#

class IssuePriority < ApplicationRecord
  has_many :issues
end
