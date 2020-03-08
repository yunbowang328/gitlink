class IssueStatus < ApplicationRecord
  has_many :issues
  belongs_to :project, optional: true
end