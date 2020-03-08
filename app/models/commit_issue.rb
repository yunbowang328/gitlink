class CommitIssue < ApplicationRecord
  belongs_to :issue, foreign_key: :issue_id

end