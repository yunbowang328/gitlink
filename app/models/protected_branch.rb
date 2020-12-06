# == Schema Information
#
# Table name: protected_branches
#
#  id                            :integer          not null, primary key
#  repo_id                       :integer
#  branch_name                   :string(255)      default("")
#  can_push                      :boolean          default("0"), not null
#  enable_whitelist              :boolean          default("0")
#  whitelist_user_i_ds           :text(65535)
#  whitelist_team_i_ds           :text(65535)
#  enable_merge_whitelist        :boolean          default("0"), not null
#  whitelist_deploy_keys         :boolean          default("0"), not null
#  merge_whitelist_user_i_ds     :text(65535)
#  merge_whitelist_team_i_ds     :text(65535)
#  enable_status_check           :boolean          default("0"), not null
#  status_check_contexts         :text(65535)
#  approvals_whitelist_user_i_ds :text(65535)
#  approvals_whitelist_team_i_ds :text(65535)
#  required_approvals            :integer          default("0")
#  enable_approvals_whitelist    :boolean          default("0"), not null
#  block_on_rejected_reviews     :boolean          default("0"), not null
#  dismiss_stale_approvals       :boolean          default("0"), not null
#  require_signed_commits        :boolean          default("0"), not null
#  protected_file_patterns       :text(65535)
#  block_on_outdated_branch      :boolean          default("0"), not null
#  created_at                    :datetime         not null
#  updated_at                    :datetime         not null
#
# Indexes
#
#  index_protected_branches_on_repo_id  (repo_id)
#

class ProtectedBranch < ApplicationRecord
  serialize :whitelist_user_i_ds, Array
  serialize :merge_whitelist_user_i_ds, Array
  serialize :approvals_whitelist_user_i_ds, Array

  belongs_to :repo, class_name: 'Repository', foreign_key: :repo_id
  validates :branch_name, presence: true
  validates :repo, presence: true

  def to_param
    self.branch_name.parameterize
  end


  def push_whitelist_usernames
    get_logins_by_ids(whitelist_user_i_ds)
  end

  def merge_whitelist_usernames
    get_logins_by_ids(merge_whitelist_user_i_ds)
  end

  def approvals_whitelist_usernames
    get_logins_by_ids(approvals_whitelist_user_i_ds)
  end

  def get_logins_by_ids(ids)
    User.where(id: ids).map(&:login)
  end

end
