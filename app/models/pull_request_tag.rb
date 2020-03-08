class PullRequestTag < ApplicationRecord
  belongs_to :issue_tag
  belongs_to :pull_request
end
