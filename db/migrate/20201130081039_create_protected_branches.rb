class CreateProtectedBranches < ActiveRecord::Migration[5.2]
  def change
    create_table :protected_branches do |t|
      t.integer :repo_id
      t.string :branch_name, default: ""
      t.boolean :can_push, default: false, null: false
      t.boolean :enable_whitelist, default: false
      t.text :whitelist_user_i_ds
      t.text :whitelist_team_i_ds
      t.boolean :enable_merge_whitelist, default: false, null: false
      t.boolean :whitelist_deploy_keys, default: false, null: false
      t.text :merge_whitelist_user_i_ds
      t.text :merge_whitelist_team_i_ds
      t.boolean :enable_status_check, default: false, null: false
      t.text :status_check_contexts
      t.text :approvals_whitelist_user_i_ds
      t.text :approvals_whitelist_team_i_ds
      t.integer :required_approvals, default: 0
      t.boolean :enable_approvals_whitelist, default: false, null: false
      t.boolean :block_on_rejected_reviews, default: false, null: false
      t.boolean :dismiss_stale_approvals, default: false, null: false
      t.boolean :require_signed_commits, default: false, null: false
      t.text :protected_file_patterns
      t.boolean :block_on_outdated_branch, default: false, null: false

      t.timestamps
    end

    add_index :protected_branches, :repo_id
  end
end
