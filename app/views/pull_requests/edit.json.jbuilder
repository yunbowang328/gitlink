json.partial! "commons/success"
json.partial! "pull_requests/merge_item"
json.extract! @pull_request, :id, :title, :body, :milestone,:head,:base
json.extract! @issue, :assigned_to_id, :fixed_version_id, :priority_id
json.issue_tag_ids @issue.issue_tags_value.split(",")
