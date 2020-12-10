json.branch_name protected_branch.branch_name
json.enable_push protected_branch.can_push
json.required_approvals protected_branch.required_approvals
json.enable_status_check protected_branch.enable_status_check
json.enable_push_whitelist protected_branch.enable_whitelist
json.enable_merge_whitelist protected_branch.enable_merge_whitelist
json.enable_approvals_whitelist protected_branch.enable_approvals_whitelist
json.dismiss_stale_approvals protected_branch.dismiss_stale_approvals
json.block_on_rejected_reviews protected_branch.block_on_rejected_reviews
json.block_on_outdated_branch protected_branch.block_on_outdated_branch
json.require_signed_commits protected_branch.require_signed_commits
json.merge_whitelist_usernames protected_branch.merge_whitelist_usernames
json.push_whitelist_usernames protected_branch.push_whitelist_usernames
json.approvals_whitelist_usernames protected_branch.approvals_whitelist_usernames
json.created_at protected_branch.created_at.strftime("%Y-%m-%d %H:%M")
json.updated_at protected_branch.updated_at.strftime("%Y-%m-%d %H:%M")