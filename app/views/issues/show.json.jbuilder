json.partial! "commons/success"
json.extract! @issue, :id,:subject,:is_lock,:description,:is_private, :start_date,:due_date,:estimated_hours

json.user_permission @user_permission
json.closed_on @issue.closed_on.present? ? format_time(@issue.closed_on) : ""
json.created_at format_time(@issue.created_on)
json.assign_user_name @issue_assign_to.try(:show_real_name)
json.assign_user_login @issue_assign_to.try(:login)
json.author_name @issue_user.try(:show_real_name)
json.author_login @issue_user.try(:login)
json.author_picture url_to_avatar(@issue_user)
json.tracker @issue.tracker.try(:name)
json.issue_status @issue.issue_status.try(:name)
json.priority @issue.priority.try(:name)
json.version @issue.version.try(:name)
json.issue_tags @issue.get_issue_tags
json.done_ratio @issue.done_ratio.to_s + "%" 
json.issue_type @issue.issue_type
json.token @issue.issue_type == "2" ? @issue.token : ""
json.join_users @join_users
# json.cost_time @cost_time_array
# json.total_cost_time Time.at(@all_cost_time).utc.strftime('%H h %M min %S s')
# json.be_depended_issues @be_depended_issues_array
# json.depended_issues @depended_issues_array
json.issue_classify @issue.issue_classify
json.branch_name @issue.branch_name
json.journals_count @issue.get_journals_size
json.attachments do
  json.array! @issue_attachments do |attachment|
    json.partial! "attachments/attachment_simple", locals: {attachment: attachment}
  end
end




