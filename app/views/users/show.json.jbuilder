json.partial! 'users/user', locals: { user: @user }
json.undo_messages @waiting_applied_messages.size 
json.undo_transfer_projects @common_applied_transfer_projects.size
json.undo_events @undo_events
json.user_composes_count @user_composes_count
json.user_org_count @user_org_count
json.common_projects_count @projects_common_count
json.mirror_projects_count @projects_mirrior_count
json.sync_mirror_projects_count @projects_sync_mirrior_count