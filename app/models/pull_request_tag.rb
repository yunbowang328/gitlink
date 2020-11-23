# == Schema Information
#
# Table name: pull_request_tags
#
#  id              :integer          not null, primary key
#  issue_tag_id    :integer
#  pull_request_id :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_pull_request_tags_on_issue_tag_id_and_pull_request_id  (issue_tag_id,pull_request_id)
#

class PullRequestTag < ApplicationRecord
  belongs_to :issue_tag
  belongs_to :pull_request
end
