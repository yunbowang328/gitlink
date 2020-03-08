if @status > 0
  json.status 0
  json.message "复制成功"
  json.issue_id @new_issue.id
else
  json.status -1
  json.message "复制失败"
end