class IssueTagsRelate < ApplicationRecord
  belongs_to :issue
  belongs_to :issue_tag, counter_cache: :issues_count
end
