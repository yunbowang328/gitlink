# == Schema Information
#
# Table name: issue_tags_relates
#
#  id           :integer          not null, primary key
#  issue_id     :integer
#  issue_tag_id :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
# Indexes
#
#  index_issue_tags_relates_on_issue_id_and_issue_tag_id  (issue_id,issue_tag_id)
#

class IssueTagsRelate < ApplicationRecord
  belongs_to :issue
  belongs_to :issue_tag, counter_cache: :issues_count
end
