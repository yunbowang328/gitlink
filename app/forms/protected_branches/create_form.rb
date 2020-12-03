class ProtectedBranches::CreateForm < BaseForm
  attr_accessor :repository, :branch_name, :can_push, :enable_whitelist, :whitelist_user_i_ds,
                :whitelist_team_i_ds, :enable_merge_whitelist, :whitelist_deploy_keys, :merge_whitelist_user_i_ds,
                :merge_whitelist_team_i_ds, :enable_status_check, :status_check_contexts, :approvals_whitelist_user_i_ds,
                :approvals_whitelist_team_i_ds, :required_approvals, :enable_approvals_whitelist, :block_on_rejected_reviews,
                :dismiss_stale_approvals, :require_signed_commits, :protected_file_patterns, :block_on_outdated_branch

  validates :repo_id, :branch_name, presence: true

  validate do
    check_branch_name!
  end


  def check_branch_name!
    protected_branch_exists = repository.protected_branches.exists?(branch_name)
    raise "Protected branch '#{branch_name}' already exists" if protected_branch_exists
  end
end
