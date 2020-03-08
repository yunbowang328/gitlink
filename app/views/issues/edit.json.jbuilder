json.partial! "commons/success"
json.extract! @issue, :id,:subject,:description,:is_private,:assigned_to_id,:tracker_id,:status_id,:priority_id,:fixed_version_id,
              :start_date,:due_date,:estimated_hours, :issue_type, :token,:issue_classify, :branch_name
json.done_ratio @issue.done_ratio.to_s + "%"
json.issue_tags @issue.get_issue_tags
json.issue_chosen @issue_chosen
json.branches @all_branches
json.attachments do
  json.array! @issue_attachments do |attachment|
    json.partial! "attachments/attachment_simple", locals: {attachment: attachment}
  end
end
