# == Schema Information
#
# Table name: pull_request
#
#  id                      :integer          not null, primary key
#  type                    :integer
#  status                  :integer
#  conflicted_files        :text(65535)
#  commits_ahead           :integer
#  commits_behind          :integer
#  changed_protected_files :text(65535)
#  issue_id                :integer
#  index                   :integer
#  head_repo_id            :integer
#  base_repo_id            :integer
#  head_branch             :string(255)
#  base_branch             :string(255)
#  merge_base              :string(40)
#  has_merged              :boolean
#  merged_commit_id        :string(40)
#  merger_id               :integer
#  merged_unix             :integer
#
# Indexes
#
#  IDX_pull_request_base_repo_id  (base_repo_id)
#  IDX_pull_request_has_merged    (has_merged)
#  IDX_pull_request_head_repo_id  (head_repo_id)
#  IDX_pull_request_issue_id      (issue_id)
#  IDX_pull_request_merged_unix   (merged_unix)
#  IDX_pull_request_merger_id     (merger_id)
#

class Gitea::Pull < Gitea::Base
  self.inheritance_column = nil # FIX  The single-table inheritance mechanism failed
  # establish_connection :gitea_db
  
  self.table_name = "pull_request"

  serialize :conflicted_files, Array

  belongs_to :pull_request, class_name: '::PullRequest', foreign_key: :id, primary_key: :gitea_id, optional: true

end
