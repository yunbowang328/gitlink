json.type @owner.type
if @owner.is_a?(Organization)
  json.partial! "organizations/organizations/detail", organization: @owner
  json.can_create_project @can_create_project
  json.is_admin @is_admin
  json.is_member @is_member
elsif @owner.is_a?(User)
  json.partial! 'users/user', locals: { user: @owner }
  json.undo_messages @waiting_applied_messages.size 
  json.undo_transfer_projects @common_applied_transfer_projects.size
  json.undo_join_projects @common_applied_projects.size
  json.undo_events @undo_events
  json.user_composes_count @user_composes_count
  json.user_org_count @user_org_count
  json.common_projects_count @projects_common_count
  json.mirror_projects_count @projects_mirrior_count
  json.sync_mirror_projects_count @projects_sync_mirrior_count
  json.created_time format_time(@owner.created_on)
  json.email @owner.show_email ? @owner.mail : nil
  json.province @owner.show_location ? @owner.province : nil
  json.city @owner.show_location ? @owner.city : nil
  json.custom_department @owner.show_department ? @owner.custom_department : nil
  json.description @owner.description
elsif
  json.nil
end